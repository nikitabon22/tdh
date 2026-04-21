const fs = require("fs");
const path = require("path");

const root = process.cwd();
const imagesRoot = path.join(root, "public", "images", "works");
const fallbackImage = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=85";

const rawWorks = [
  ["8", "VW Bora", "Оптика", "VW Bora\nПеречень выполненой работы:\n1. Установка bi-led линз 2.5\n2. RGB маски\n3. Установка новых стёкол + бронепленка."],
  ["9", "BMW X3", "Оптика", "BMW X3\nПеречень выполненой работы:\n1. Замена стекла\n2. Замена модулей"],
  ["10", "Kia Sporteg", "Химчистка", "Kia Sporteg\nПеречень выполненой работы:\n1. Перепродажная подготовка (химчистка)\n2. Сухой туман (удаление запаха)"],
  ["11", "Passat B6", "Потолок", "Passat B6\nПеретяжка потолка"],
  ["12", "Passat B8", "Кузов", "Passat B8\nПеречень выполненой работы:\n1. Притемнение задних фонарей\n2. Притемнение хрома"],
  ["13", "Hyundai Sonata", "Оптика", "Hyundai Sonata\nПеречень выполненой работы:\n1. Установка Bi-led линз 3.0\n2. Установка новых стекл.\n3. Притемнение передних фар , стопов.\n4. Притемнение хрома"],
  ["15", "Renault Trafic", "Оптика", "Renault Trafic\nПеречень выполненоы работы:\n1. Установка Bi-led линз 2.5 / 2-х чиповые\n2. Установка масок\n3. Полировка фар\n4. Оклейка бронепленкой\nМы находимся по улице г.Горловка ул. Остапенко 45А ,ориентир бывшая заправка Extra\nТелефон для записи +79493359542."],
  ["17", "Audi A4 B8", "Оптика", "Audi A4 B8\nПеречень выполненной работы:\n1. Установка Bi-led модулей 3.0\n2. Замена стекла фар\nМы находимся по адресу: г. Горловка ул. Остапенко 45А , ориентир бывшая заправка Extra\nТелефон для записи +79493359542."],
  ["18", "УАЗ PATRIOT", "Потолок", "УАЗ PATRIOT\nПеречень выполненной работы:\nПеретяжка потолка + стойки\nМы находимся по адресу: г. Горловка ул. Остапенко 45А , ориентир бывшая заправка Extra\nТелефон для записи +79493359542."],
  ["19", "Hyundai Sonata Sport", "Полировка", "Hyundai Sonata Sport\nПеречень выполненной работы:\n1. Полировка фар , перед-зад\n2. Оклейка бронепленкой передние фары\n3. Оклейка темной пленкой задних фар\nМы находимся по адресу: г. Горловка ул. Остапенко 45А , ориентир бывшая заправка Extra\nТелефон для записи +79493359542."],
  ["20", "Nissan Note", "Оптика", "Nissan Note\nПеречень выполненной работы:\n1. Установка Bi-led модулей\nМы находимся по адресу: г. Горловка ул. Остапенко 45А , ориентир бывшая заправка Extra\nТелефон для записи +79493359542."],
  ["21", "Volkswagen Polo", "Оптика", "Volkswagen Polo\nВыполненный объём работ:\n1. Демонтаж готового изделия (фары)\n2. Изменение и установка альтернативных точек крепления линзы\n3. Сборка фар с последующей регулировкой\n4. Оклейка фар бронепленкой"],
  ["22", "Opel Astra G", "Полировка", "Opel Astra G\nВыполненный объём работ:\n1. Установка Bi-led модулей\n2. Полировка фар\nНаш адрес: г. Горловка, ул. Остапенко, 45А (ориентир — бывшая заправка Extra)\nЗапись по телефону: +7 949 335-95-42"],
  ["23", "УАЗ Patriot", "Потолок", "УАЗ Patriot\nВыполненный объём работ:\n1. Перетяжка потолка\nНаш адрес: г. Горловка, ул. Остапенко, 45А (ориентир — бывшая заправка Extra)\nЗапись по телефону: +7 949 335-95-42"]
];

function imagesFor(id) {
  const dir = path.join(imagesRoot, `post-${id}`);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .map((file) => ({ file, full: path.join(dir, file) }))
    .filter((item) => fs.statSync(item.full).size >= 30000)
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
    .map((item) => `/images/works/post-${id}/${item.file}`);
}

const works = rawWorks.map(([id, title, category, description]) => {
  const images = imagesFor(id);
  return {
    id,
    title,
    category,
    description,
    url: `https://vk.com/wall-233387765_${id}`,
    image: images[0] || fallbackImage,
    images,
    alt: `Выполненная работа TDH Studio #${id}`
  };
});

fs.writeFileSync(path.join(root, "src", "data", "vkBrowserWorks.json"), JSON.stringify(works, null, 2) + "\n", "utf8");
console.log("vkBrowserWorks restored", works.length);
