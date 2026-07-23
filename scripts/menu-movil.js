document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('boton-menu-movil');
    const btnCerrar = document.getElementById('cerrar-menu-movil');
    const menuMovil = document.getElementById('menu-movil');
    const overlay = document.getElementById('capa-menu-movil');

    if (btnMenu && menuMovil && overlay) {
        function abrirMenu() {
            menuMovil.classList.remove('oculto');
            overlay.classList.remove('oculto');
            btnMenu.setAttribute('aria-expanded', 'true');
            
            // Forzar reflujo para activar la transición CSS
            void menuMovil.offsetWidth;
            
            menuMovil.classList.add('activo');
            overlay.classList.add('activo');
            
            document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
        }

        function cerrarMenu() {
            menuMovil.classList.remove('activo');
            overlay.classList.remove('activo');
            btnMenu.setAttribute('aria-expanded', 'false');
            
            setTimeout(() => {
                menuMovil.classList.add('oculto');
                overlay.classList.add('oculto');
            }, 300); // Sincronizado con la transición CSS
            
            document.body.style.overflow = '';
        }

        btnMenu.addEventListener('click', abrirMenu);
        if (btnCerrar) btnCerrar.addEventListener('click', cerrarMenu);
        overlay.addEventListener('click', cerrarMenu);

        // Permitir cerrar el menú al presionar la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuMovil.classList.contains('activo')) {
                cerrarMenu();
            }
        });
    }
});
