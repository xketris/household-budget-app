/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        foreground: "#e0e0e0",
        primary: "#ffd600",
        secondary: "#ab9249",
        border: "##2a2a2a",
        input: "#1a1a1a"
      }
    },
  },
  plugins: [],
}