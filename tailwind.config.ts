import type { Config } from "tailwindcss";

const config: Config = {
content: [
     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        'eurofarma-blue': 'var(--color-eurofarma-blue)',
        'eurofarma-yellow': 'var(--color-eurofarma-yellow)',
        'light-grey': 'var(--color-light-grey)',
        'light-black': 'var(--color-light-black)',
      },
    },
  },
  plugins: [],
};

export default config;
  