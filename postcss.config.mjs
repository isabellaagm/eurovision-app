/** @type {import('postcss').Config} */
const config = {
  plugins: {
    // Esta é a correção. O nome correto do plugin é 'tailwindcss'.
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
