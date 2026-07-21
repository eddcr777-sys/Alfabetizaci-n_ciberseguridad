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
        // Colores tradicionales e institucionales (más sobrios)
        "primario": "#0F5132", // Verde oscuro clásico
        "en-primario": "#ffffff",
        "contenedor-primario": "#D1E7DD", // Verde muy claro clásico
        "en-contenedor-primario": "#0F5132",
        "primario-container": "#D1E7DD",
        "on-primary-container": "#0F5132",
        "primario-fixed": "#D1E7DD",
        "primario-fixed-dim": "#A3CFBB",
        "on-primary-fixed": "#051B11",

        "secundario": "#052C65", // Azul marino clásico
        "en-secundario": "#ffffff",
        "contenedor-secundario": "#CFE2FF",
        "en-contenedor-secundario": "#052C65",
        "secundario-container": "#CFE2FF",
        "on-secondary-container": "#052C65",

        "terciario": "#495057", // Gris oscuro clásico
        "en-terciario": "#ffffff",

        "error": "#DC3545", // Rojo estándar
        "en-error": "#ffffff",

        "fondo": "#ffffff",
        "en-fondo": "#212529",

        "superficie": "#ffffff",
        "en-superficie": "#212529",
        "variante-superficie": "#F8F9FA", // Gris muy claro (fondo clásico)
        "en-variante-superficie": "#212529",
        "en-superficie-variant": "#495057",

        "contorno": "#DEE2E6",
        "variante-contorno": "#E9ECEF",
        "outline-variant": "#DEE2E6",

        "on-primary": "#ffffff",

        "white-container-low": "#F8F9FA",
        "white-container-lowest": "#FFFFFF",
      },
      borderRadius: {
        // Redondos tradicionales (eliminando los bordes tipo píldora o burbuja exagerados)
        "defecto": "0.25rem",
        "grande": "0.3rem",
        "extra-grande": "0.5rem",
      },
      fontFamily: {
        // Tipografía clásica, estándar y profesional de sistema
        "titulares": ["Arial", "Helvetica", "sans-serif"],
        "cuerpo": ["Arial", "Helvetica", "sans-serif"],
        "etiquetas": ["Arial", "Helvetica", "sans-serif"],
      }
    },
  },
  plugins: [],
}
