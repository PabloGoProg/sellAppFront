/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      platinium: '#D9DCD6',
      cerulean: '#3a7ca5',
      lapis_lazuli: '#2f6690ff',
      indigo_dye: '#16425bff',
      sky_blue: '#81c3d7ff'
    },
    extend: {},
  },
  plugins: [],
}
