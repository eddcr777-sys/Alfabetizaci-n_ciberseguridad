document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('boton-menu-movil') || document.querySelector('[data-menu-toggle]');
    const btnCerrar = document.getElementById('cerrar-menu-movil');
    const menuMovil = document.getElementById('menu-movil') || document.querySelector('.menu-lateral');
    const overlay = document.getElementById('capa-menu-movil') || document.getElementById('drawer-overlay') || document.querySelector('.capa-menu-movil');

    if (btnMenu && menuMovil && overlay) {
        const abrirMenu = () => {
            menuMovil.classList.remove('oculto');
            overlay.classList.remove('oculto');
            overlay.classList.add('activo');
            menuMovil.classList.add('activo');
            btnMenu.setAttribute('aria-expanded', 'true');
            btnMenu.setAttribute('aria-controls', menuMovil.id || 'menu-movil');
            menuMovil.setAttribute('aria-hidden', 'false');
            overlay.setAttribute('aria-hidden', 'false');

            void menuMovil.offsetWidth;
            document.body.style.overflow = 'hidden';
        };

        const cerrarMenu = () => {
            menuMovil.classList.remove('activo');
            overlay.classList.remove('activo');
            btnMenu.setAttribute('aria-expanded', 'false');
            menuMovil.setAttribute('aria-hidden', 'true');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';

            window.setTimeout(() => {
                menuMovil.classList.add('oculto');
                overlay.classList.add('oculto');
            }, 280);
        };

        btnMenu.addEventListener('click', abrirMenu);
        if (btnCerrar) btnCerrar.addEventListener('click', cerrarMenu);
        overlay.addEventListener('click', cerrarMenu);

        menuMovil.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', cerrarMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuMovil.classList.contains('activo')) {
                cerrarMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 767 && menuMovil.classList.contains('activo')) {
                cerrarMenu();
            }
        });
    }
});
