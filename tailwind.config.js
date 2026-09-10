/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#05060a",
        surface: "#090b12",
        "surface-border": "#151928",
        sentient: {
          cyan: "#06b6d4",
          teal: "#14b8a6",
          indigo: "#6366f1",
          violet: "#8b5cf6",
          purple: "#a855f7",
          fuchsia: "#d946ef",
          amber: "#f59e0b",
        }
      },
      fontFamily: {
        display: ['Syne', 'Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'synapse': 'synapse 6s ease-in-out infinite alternate',
        'sentient-glow': 'sentientGlow 4s ease-in-out infinite alternate',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        synapse: {
          '0%': { opacity: '0.4', transform: 'scale(0.98)' },
          '100%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        sentientGlow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.4)) drop-shadow(0 0 35px rgba(6, 182, 212, 0.2))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.7)) drop-shadow(0 0 60px rgba(99, 102, 241, 0.4))' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
