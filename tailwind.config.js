/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#0ff',
          pink: '#f0f',
          green: '#0f0',
          yellow: '#ff0',
          purple: '#b0f',
        },
        dark: {
          100: '#1a1a2e',
          200: '#16213e',
          300: '#0f172a',
          400: '#0a0f1f',
          500: '#05070f',
        },
        // Temas por módulo — usados via CSS variables, mas declarados aqui
        // para que o Tailwind não purgue as classes de referência
        module: {
          '1': '#00b4d8', // Azul
          '2': '#f5c400', // Amarelo
          '3': '#22c55e', // Verde
          '4': '#f97316', // Laranja
          '5': '#a855f7', // Roxo
          '6': '#94a3b8', // Cinza
        },
      },
      fontFamily: {
        'mono': ['Fira Code', 'monospace'],
        'cyber': ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px #0ff, 0 0 10px #0ff',
        'neon-pink': '0 0 5px #f0f, 0 0 10px #f0f',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 5px #0ff, 0 0 10px #0ff' },
          '50%': { textShadow: '0 0 20px #0ff, 0 0 30px #0ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}