/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2A44",
        "ink-soft": "#545E76",
        manila: "#EFE6D3",
        "manila-line": "#D9CBA8",
        card: "#FFFDF8",
        gold: "#D79A2C",
        brick: "#A63D2F",
        sage: "#5F8064",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
