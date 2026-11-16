/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Broadsheet"', '"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Sitka Text"', 'Sitka', '"Lora"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          dark: '#330E07',
          darker: '#260904',
          brown: '#4A180F',
          red: '#741712',
          redHover: '#5D110D',
          kraft: '#D5BCA0',
          kraftLight: '#DFCBB2',
          kraftCard: '#CDB396',
          artisanCard: '#865D4E',
          mustard: '#D8923E',
          inputGold: '#E4A85D',
          courseBg: '#EAE0D2',
          courseCard: '#D8CBB8',
          cream: '#F4E8D8',
        }
      }
    },
  },
  plugins: [],
}

