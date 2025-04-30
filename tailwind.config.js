/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Pode ou não estar presente
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Essencial para o App Router
    ],
    theme: {
      extend: {
        spacing: {
            '5': '1.25rem', // Verifique se essa linha está presente (p-5 é 1.25rem)
          },
        backgroundImage: {
          "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
          "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
      },
    },
    plugins: [],
  };
  