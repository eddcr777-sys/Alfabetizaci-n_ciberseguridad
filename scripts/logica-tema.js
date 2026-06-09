// logica-tema.js

// 1. Revisar si hay un tema guardado o si el sistema operativo está en modo oscuro
const temaGuardado = localStorage.getItem('tema');
const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 2. Aplicar el tema inicial apenas cargue la página
if (temaGuardado === 'oscuro' || (!temaGuardado && prefiereOscuro)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// 3. Función para alternar el tema al hacer clic en un botón
function alternarModoOscuro() {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark');
    
    // Guardar la nueva preferencia en el navegador
    if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('tema', 'oscuro');
    } else {
        localStorage.setItem('tema', 'claro');
    }
}
