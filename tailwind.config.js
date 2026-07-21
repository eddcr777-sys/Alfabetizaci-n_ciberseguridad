/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./paginas/**/*.html",
    "./scripts/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Estrictamente Verde (Sin rastros de azul)
        "primario": "#043a0aff",
        "en-primario": "#ffffff",
        "contenedor-primario": "#022c22",
        "en-contenedor-primario": "#022c22",
        "primario-container": "#022c22",
        "on-primary-container": "#022c22",
        "primario-fixed": "#d1fae5",
        "primario-fixed-dim": "#a7f3d0",
        "on-primary-fixed": "#064e3b",

        "secundario": "#021308ff",
        "en-secundario": "#ffffff",
        "contenedor-secundario": "#ecfdf5",
        "en-contenedor-secundario": "#064e3b",
        "secundario-container": "#ecfdf5",
        "on-secondary-container": "#064e3b",

        "terciario": "#022c09ff",
        "en-terciario": "#ffffff",

        "error": "#b91c1c",
        "en-error": "#ffffff",

        "fondo": "#ffffff",
        "en-fondo": "#022c22",

        "superficie": "#ffffff",
        "en-superficie": "#022c22",
        "variante-superficie": "#f0fdf4",
        "en-variante-superficie": "#166534",
        "en-superficie-variant": "#64748b",

        "contorno": "#d1fae5",
        "variante-contorno": "#ecfdf5",
        "outline-variant": "#e2e8f0",

        "on-primary": "#ffffff",

        "white-container-low": "#f8fafc",
        "white-container-lowest": "#f1f5f9",
      },
      borderRadius: {
        "defecto": "0.5rem",
        "grande": "0.75rem",
        "extra-grande": "1rem",
      },
      fontFamily: {
        "titulares": ["Manrope", "sans-serif"],
        "cuerpo": ["Public Sans", "sans-serif"],
        "etiquetas": ["Public Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}
