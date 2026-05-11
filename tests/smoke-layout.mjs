import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const targetUrl = process.env.TARGET_URL || "https://tdh-kappa.vercel.app/";
const mode = process.argv.includes("--layout")
  ? "layout"
  : process.argv.includes("--smoke")
    ? "smoke"
    : "all";

const viewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 844 }
];

const failures = [];
const browserCandidates = [
  process.env.PLAYWRIGHT_EXECUTABLE_PATH
].filter(Boolean);

function assert(condition, message) {
  if (!condition) failures.push(message);
}

async function collectLayoutIssues(page) {
  return await page.evaluate(() => {
    const issues = [];
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - doc.clientWidth;
    const isInsideHorizontalScroller = (el) => {
      let node = el.parentElement;
      while (node && node !== document.body) {
        const style = getComputedStyle(node);
        if (["auto", "scroll"].includes(style.overflowX)) return true;
        node = node.parentElement;
      }
      return false;
    };

    if (overflow > 2) {
      issues.push(`Horizontal overflow: ${overflow}px`);
    }

    const visibleElements = [...document.body.querySelectorAll("a, button, iframe")]
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
      });

    for (const el of visibleElements) {
      const rect = el.getBoundingClientRect();
      const label = `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${el.textContent?.trim() ? ` "${el.textContent.trim().slice(0, 48)}"` : ""}`;

      if (rect.width > doc.clientWidth + 2) {
        issues.push(`Element wider than viewport: ${label}`);
      }

      if (!isInsideHorizontalScroller(el) && (rect.left < -2 || rect.right > doc.clientWidth + 2)) {
        issues.push(`Element outside viewport: ${label}`);
      }

      if (el.scrollWidth - el.clientWidth > 4 && rect.width < doc.clientWidth) {
        issues.push(`Text/content clipped horizontally: ${label}`);
      }

      if (el.scrollHeight - el.clientHeight > 8 && !["IFRAME"].includes(el.tagName)) {
        issues.push(`Text/content clipped vertically: ${label}`);
      }

      if (el.tagName === "IFRAME" && rect.height < 260) {
        issues.push(`Map iframe too short: ${Math.round(rect.height)}px`);
      }
    }

    return issues;
  });
}

async function scrollThroughPage(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize()?.height || 900;

  for (let y = 0; y < height; y += Math.floor(viewportHeight * 0.75)) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(250);
  }

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(700);
}

async function collectImageIssues(page) {
  return await page.evaluate(() => {
    const issues = [];
    const images = [...document.images].filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.width >= 80 && rect.height >= 80;
    });

    for (const img of images) {
      if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
        issues.push(`Image failed to load: ${img.currentSrc || img.src}`);
      }
    }

    return issues;
  });
}

async function runSmoke(page) {
  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});

  const title = await page.title();
  assert(title.includes("TDH Studio"), `Unexpected title: ${title}`);

  await assertVisible(page, "header", "Header is missing");
  await assertVisible(page, "main", "Main content is missing");
  await assertVisible(page, "text=Наши услуги", "Services heading is missing");
  await assertVisible(page, "text=Почему выбирают нас?", "Benefits heading is missing");
  await assertVisible(page, "text=Мы находимся", "Contacts heading is missing");
  await assertVisible(page, "text=ул. Остапенко 45А", "Address is missing");
  await assertAnyVisible(page, "a[href^='tel:']", "Phone link is missing");
  await assertAnyVisible(page, "a[href*='t.me']", "Telegram link is missing");
  await assertVisible(page, "iframe[title='Карта проезда к TDH Studio']", "Yandex map iframe is missing");

  const mapSrc = await page.locator("iframe[title='Карта проезда к TDH Studio']").first().getAttribute("src");
  assert(mapSrc?.includes("pt=37.983774"), "Map iframe does not include the exact marker longitude");
  assert(mapSrc?.includes("48.303336"), "Map iframe does not include the exact marker latitude");
}

async function assertVisible(page, selector, message) {
  const locator = page.locator(selector).first();
  assert(await locator.count() > 0, message);
  if (await locator.count() > 0) {
    assert(await locator.isVisible(), message);
  }
}

async function assertAnyVisible(page, selector, message) {
  const locator = page.locator(selector);
  const count = await locator.count();
  assert(count > 0, message);
  if (count === 0) return;

  let visible = false;
  for (let index = 0; index < count; index += 1) {
    if (await locator.nth(index).isVisible()) {
      visible = true;
      break;
    }
  }
  assert(visible, message);
}

async function run() {
  await mkdir(path.resolve("tmp", "test-screenshots"), { recursive: true });

  const executablePath = browserCandidates.find((candidate) => existsSync(candidate));
  const browser = await chromium.launch({
    executablePath,
    headless: true
  });
  try {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport });

      if (mode === "smoke" || mode === "all") {
        await runSmoke(page);
      } else {
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
        await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      }

      if (mode === "layout" || mode === "all") {
        await scrollThroughPage(page);
        const issues = await collectLayoutIssues(page);
        for (const issue of issues) failures.push(`${viewport.name}: ${issue}`);
        const imageIssues = await collectImageIssues(page);
        for (const issue of imageIssues) failures.push(`${viewport.name}: ${issue}`);
        await page.screenshot({
          path: path.resolve("tmp", "test-screenshots", `${viewport.name}.png`),
          fullPage: true
        });
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }

  if (failures.length) {
    console.error(`\n${failures.length} test failure(s):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`OK: ${mode} checks passed for ${targetUrl}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
