/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF5F7",
        pastelPink: "#FFD6E0",
        peachPink: "#FFB6C8",
        accentPink: "#E8799A",
        plumText: "#2B121C",
        plumMuted: "#522A38",
        deepPlum: "#1F0B14",
        butterYellow: "#FFE8B8",
        mintPale: "#D4F0E6",
      },
      fontFamily: {
        handwriting: ['"Dancing Script"', '"Pacifico"', 'cursive'],
        body: ['"Be Vietnam Pro"', '"Nunito"', '"Quicksand"', 'sans-serif'],
        display: ['"Nunito"', '"Be Vietnam Pro"', 'sans-serif'],
      },
      boxShadow: {
        'soft-pink': '0 10px 25px -5px rgba(232, 121, 154, 0.25), 0 8px 10px -6px rgba(232, 121, 154, 0.15)',
        'sticker': '0 4px 12px rgba(232, 121, 154, 0.2), 0 0 0 3px #ffffff',
        'card-3d': '0 20px 40px -15px rgba(90, 58, 69, 0.18)',
      },
      borderRadius: {
        'card': '28px',
      }
    },
  },
  plugins: [],
}
