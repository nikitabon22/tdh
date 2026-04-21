/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        canvas: "#030507",
        panel: "#070a0f",
        muted: "#a0a4ad",
        accent: {
          DEFAULT: "#d8a139",
          soft: "#f0bd56"
        }
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Oswald", "Manrope", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
