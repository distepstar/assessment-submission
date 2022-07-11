/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cx-dark-purple': '#6B47ED',
        'cx-gray': '#E5E5E5',
        'cx-red': "#DC9FA5",

      }

    },
  },
  plugins: [],
}
