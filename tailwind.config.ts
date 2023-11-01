import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [
    nextui({
      defaultTheme: "dark",
      themes: {
        light: {
          colors: {},
        },
        dark: {
          colors: {
            background: "#000",
          },
        },
      },
    }),
    require("@tailwindcss/typography"),
  ],
  darkMode: "class",
};
export default config;
