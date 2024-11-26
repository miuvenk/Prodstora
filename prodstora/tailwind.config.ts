import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        '3xl': "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;"
      },
      keyframes: {
        pulsate: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
        progress: {
          "0%": { left: "-100%", width: "30%" },
          "50%": { left: "50%", width: "30%" },
          "100%": { left: "100%", width: "30%" },
        },
        gradientGlow: {
          '0%, 100%': { background: 'linear-gradient(45deg, #28a745, #6dbf80)' },
          '50%': { background: 'linear-gradient(45deg, #6dbf80, #28a745)' },
        },
      },
      animation: {
        pulsate: 'pulsate 2s ease-in-out infinite',
        progress: "progress 2s linear infinite",
        gradientGlow: 'gradientGlow 3s ease infinite',
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
