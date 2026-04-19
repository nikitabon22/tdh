/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        canvas: "#05070b",
        panel: "#0c1118",
        muted: "#8b95a7",
        line: "rgba(255,255,255,0.08)",
        accent: {
          DEFAULT: "#d4a84f",
          soft: "#f1d69a"
        }
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"],
        display: ["Syne", "Manrope", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(0, 0, 0, 0.45)",
        accent: "0 18px 48px rgba(212, 168, 79, 0.18)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(212, 168, 79, 0.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent)"
      }
    }
  },
  plugins: []
};
