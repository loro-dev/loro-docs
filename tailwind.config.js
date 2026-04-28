const plugin = require("tailwindcss/plugin");


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      inset: {
        "unset": "unset",
      },
      screens: {
        'touch': { 'raw': '(pointer: coarse)' },
        'mouse': { 'raw': '(pointer: fine)' },
      },
      borderColor: {
        separator: "rgba(242, 251, 254, 0.20)",
        "editor-panel-body": "rgba(255, 255, 255, 0.1)"
      },
      backgroundColor: {
        "timeline": "rgb(28, 28, 28)",
        "example": "rgba(28, 28, 28)"
      },
      backgroundImage: {
        "blue-green": "linear-gradient(94deg, #98b0ff 0%, #42ffa4 93.93%)",
        "timeline-change":
          "linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 113.03%)",
      },
      fontSize: {
        "1.5xl": "1.375rem", // 22px
        "hero-large": "70px",
        "hero-small": "40px",
      },
      spacing: {
        3.75: "0.9375rem", // 15px
        7.5: "1.875rem", // 30px
        9.5: "2.375rem", // 38px
        12.5: "3.125rem", // 50px
        13.5: "3.375rem", // 54px
        15: "3.75rem", // 60px
        18: "4.5rem", // 72px
        25: "6.25rem", // 100px
        37.5: "9.375rem", // 150px
        50: "12.5rem", // 200px
        90: "22.5rem", // 360px
      },
      gridTemplateColumns: {
        "twin-editors": "minmax(0, 1fr) auto minmax(0, 1fr)",
      },
      gridTemplateRows: {
        "twin-editors": "1fr auto 1fr",
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      // Add property `-webkit-text-fill-color`
      const newUtilities = {
        ".text-fill-transparent": {
          "-webkit-text-fill-color": "transparent",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
}
