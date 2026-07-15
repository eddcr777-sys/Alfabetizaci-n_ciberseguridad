tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
              // Paleta Estrictamente Verde (Sin rastros de azul)
              "primario": "#043a0aff",      // Verde Esmeralda Muy Oscuro
              "en-primario": "#ffffff",
              "contenedor-primario": "#022c22", // Verde Esmeralda Medio
              "en-contenedor-primario": "#022c22",
              
              "secundario": "#021308ff",    // Verde Vibrante
              "en-secundario": "#ffffff",
              "contenedor-secundario": "#ecfdf5", // Verde Muy Tenue (Fondo)
              "en-contenedor-secundario": "#064e3b",
              
              "terciario": "#022c09ff",     // Verde Neón
              "en-terciario": "#ffffff",
              
              "error": "#b91c1c",         // Rojo para errores (necesario por usabilidad)
              "en-error": "#ffffff",
              
              "fondo": "#ffffff",         // Blanco Puro solicitado
              "en-fondo": "#022c22",
              
              "superficie": "#ffffff",
              "en-superficie": "#022c22",
              "variante-superficie": "#f0fdf4",
              "en-variante-superficie": "#166534",
              
              "contorno": "#d1fae5",
              "variante-contorno": "#ecfdf5"
      },
      "borderRadius": {
              "defecto": "0.5rem",
              "grande": "0.75rem",
              "extra-grande": "1rem",
              "2xl": "1.5rem",
              "3xl": "2rem",
              "completo": "9999px"
      },
      "fontFamily": {
              "titulares": ["Manrope", "sans-serif"],
              "cuerpo": ["Public Sans", "sans-serif"],
              "etiquetas": ["Public Sans", "sans-serif"]
      }
    },
  },
}
