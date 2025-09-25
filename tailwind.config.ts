import type { Config } from "tailwindcss";

const config: Config = {
content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        5: "1.25rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "euro-blue": "#0033a0",
        "euro-yellow": "#ffcb05",
        "light-grey": "#f2f2f2",
        "light-black": "#1a1a1a",
      },
    },
  },
  plugins: [],
};

export default config;
  