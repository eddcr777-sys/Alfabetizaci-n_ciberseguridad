/* ==========================================================================
   LÓGICA INTERACTIVA Y CARRUSELES
   ========================================================================== */
(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Control del Menú Lateral (Drawer Móvil) ---
    function initMenuMovil() {
        const botonAbrir = document.getElementById('boton-menu-movil') || document.querySelector('.boton-menu-movil');
        const botonCerrar = document.getElementById('cerrar-menu-movil') || document.querySelector('.cerrar-menu');
        const menuLateral = document.getElementById('menu-movil') || document.querySelector('.menu-lateral');
        const capaOverlay = document.getElementById('capa-menu-movil') || document.querySelector('.capa-menu-movil');
        const enlacesMenu = document.querySelectorAll('.enlace-menu');

        if (!menuLateral || !capaOverlay) return;

        const abrirMenu = () => {
            menuLateral.classList.remove('oculto');
            capaOverlay.classList.remove('oculto');
            menuLateral.classList.add('activo');
            capaOverlay.classList.add('activo');
            document.body.style.overflow = 'hidden';
        };

        const cerrarMenu = () => {
            menuLateral.classList.remove('activo');
            capaOverlay.classList.remove('activo');
            document.body.style.overflow = '';
        };

        if (botonAbrir) botonAbrir.addEventListener('click', abrirMenu);
        if (botonCerrar) botonCerrar.addEventListener('click', cerrarMenu);
        capaOverlay.addEventListener('click', cerrarMenu);

        enlacesMenu.forEach(enlace => enlace.addEventListener('click', cerrarMenu));
    }

    // --- Control de Tarjetas Desplegables (Manejado puramente desde JS) ---
    function initTarjetasDesplegables() {
        const tarjetas = document.querySelectorAll('.tarjeta-grande-desplegable');

        tarjetas.forEach(tarjeta => {
            tarjeta.addEventListener('click', (e) => {
                // Evitar colisiones si se hace clic en un enlace interno
                if (e.target.closest('a')) return;
                
                const estaActiva = tarjeta.classList.contains('activa');
                
                // Cierra las demás tarjetas abiertas (opcional)
                tarjetas.forEach(t => t.classList.remove('activa'));

                if (!estaActiva) {
                    tarjeta.classList.add('activa');
                }
            });
        });
    }

    // --- Control de Carruseles ---
    function initCarousel(pistaId, prevId, nextId) {
        const pista = document.getElementById(pistaId);
        const prevBtn = document.getElementById(prevId);
        const nextBtn = document.getElementById(nextId);

        if (!pista || !prevBtn || !nextBtn) return;

        const items = Array.from(pista.querySelectorAll('.item-carrusel-cover'));
        if (items.length < 2) {
            prevBtn.setAttribute('disabled', 'true');
            nextBtn.setAttribute('disabled', 'true');
            return;
        }

        const getStep = () => {
            const firstItem = items[0];
            if (!firstItem) return pista.clientWidth || 0;
            const rect = firstItem.getBoundingClientRect();
            return rect.width || pista.clientWidth || 0;
        };

        const scrollToTarget = (targetLeft) => {
            const maxLeft = Math.max(0, pista.scrollWidth - pista.clientWidth);
            const clampedLeft = Math.max(0, Math.min(maxLeft, targetLeft));

            requestAnimationFrame(() => {
                pista.scrollTo({
                    left: clampedLeft,
                    behavior: reduceMotion ? 'auto' : 'smooth'
                });
            });
        };

        const updateButtons = () => {
            const atStart = pista.scrollLeft <= 2;
            const atEnd = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 2;
            prevBtn.disabled = atStart;
            nextBtn.disabled = atEnd;
        };

        prevBtn.addEventListener('click', () => {
            const step = getStep();
            scrollToTarget(pista.scrollLeft - step);
        }, { passive: true });

        nextBtn.addEventListener('click', () => {
            const step = getStep();
            scrollToTarget(pista.scrollLeft + step);
        }, { passive: true });

        pista.addEventListener('scroll', updateButtons, { passive: true });

        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
                updateButtons();
                scrollToTarget(Math.min(pista.scrollLeft, Math.max(0, pista.scrollWidth - pista.clientWidth)));
            }, 80);
        };

        window.addEventListener('resize', handleResize, { passive: true });

        requestAnimationFrame(() => {
            pista.scrollLeft = 0;
            updateButtons();
        });
    }

    const startComponents = () => {
        initMenuMovil();
        initTarjetasDesplegables();
        initCarousel('pistaCoverLabores', 'btnCoverIzquierdaLabores', 'btnCoverDerechaLabores');
        initCarousel('pistaCover', 'btnCoverIzquierda', 'btnCoverDerecha');
        initCarousel('pistaCoverPersonal', 'btnCoverIzquierdaPersonal', 'btnCoverDerechaPersonal');
    };

    document.addEventListener('DOMContentLoaded', () => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => startComponents(), { timeout: 400 });
        } else {
            window.setTimeout(startComponents, 150);
        }
    });

    /* ==========================================================================
       SERVICE WORKER
       ========================================================================== */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('../sw.js').then((reg) => {
                console.log('SW registrado correctamente:', reg.scope);
            }).catch((err) => {
                console.error('Fallo en el registro del SW:', err);
            });
        });
    }
})();