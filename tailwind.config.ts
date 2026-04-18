import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brandOrange: "#F27623",
        brandDarkBlue: "#0B2E4A",
        brandLightBg: "#F3F5F7",
        brandBorder: "#DDE3EB",
      },
    },
  },
  plugins: [],
};
export default config;
