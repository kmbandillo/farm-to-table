/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',  // Include the HTML file
    './src/**/*.{js,ts,jsx,tsx}',  // Include JS/TS/JSX/TSX files inside the src folder
    'node_modules/preline/dist/*.js' // Preline's JS file
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),  // Add Preline plugin here
  ],
};
