import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#E9E6DF",
        card:    "#F0EDE7",
        navy:    "#1F3A8F",
        charcoal:"#161719",
        green:   "#1A6B3C",
        crimson: "#B01C2E",
        muted:   "#7A7670",
        border:  "#D4D0C8",
      },
      fontFamily: {
        condensed: ["Barlow Condensed", "sans-serif"],
        mono:      ["JetBrains Mono", "monospace"],
        sans:      ["Barlow", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;