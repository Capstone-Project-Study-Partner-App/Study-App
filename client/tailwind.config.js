// tailwind.config.js
module.exports = {
  // ... other configurations ...

  content: [
    './src/**/*.html', // HTML files
    './src/**/*.jsx',  // JS/React files
  ],

  plugins: [
    require("@tailwindcss/forms"),
    // Add other plugins here if needed
  ],
};