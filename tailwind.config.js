/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      background: '#282828',
      backgroundPrimary: '#1D1F21',
    
      foreground: '#C5C8C6',
      foregroundPrimary: '#EBDBB2',
      
      accent: '#005A9E',
      error: '#B03A30',
      warn: '#D57E15',
      success: '#8A8A0A',
  
      border: '#000000',
      borderLight: '#FFFFFF',
    },
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'], // Добавляем шрифт для `mono`
        main: ['MainFont', 'sans-serif']
      },
    },
  },
  plugins: [],
}