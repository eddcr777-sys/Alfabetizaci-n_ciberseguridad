document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('boton-menu-movil');
    const btnCerrar = document.getElementById('cerrar-menu-movil');
    const menuMovil = document.getElementById('menu-movil');
    const overlay = document.getElementById('capa-menu-movil');

    if (btnMenu && menuMovil && overlay) {
        function openMenu() {
            menuMovil.classList.remove('hidden');
            overlay.classList.remove('hidden');
            
            // Timeout para permitir que la clase display block se aplique antes de animar
            setTimeout(() => {
                menuMovil.classList.remove('translate-x-full');
                overlay.classList.remove('opacity-0');
            }, 10);
            
            document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
        }

        function closeMenu() {
            menuMovil.classList.add('translate-x-full');
            overlay.classList.add('opacity-0');
            
            setTimeout(() => {
                menuMovil.classList.add('hidden');
                overlay.classList.add('hidden');
            }, 300); // Igual a la duracion de la animacion CSS
            
            document.body.style.overflow = '';
        }

        btnMenu.addEventListener('click', openMenu);
        if (btnCerrar) btnCerrar.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
    }
});
