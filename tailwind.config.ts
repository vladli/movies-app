import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [
    nextui({
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            background: "#fff",
            content1: "rgb(229, 231, 235)",
          },
        },
        dark: {
          colors: {
            background: "#000",
            content1: "#000",
          },
        },
      },
    }),
  ],
  darkMode: "class",
};
export default config;
