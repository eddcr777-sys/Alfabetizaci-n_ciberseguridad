   // Lógica Interactiva del Carrusel Estilo Cover
        document.addEventListener('DOMContentLoaded', () => {
            const pistaCover = document.getElementById('pistaCover');
            const btnCoverIzquierda = document.getElementById('btnCoverIzquierda');
            const btnCoverDerecha = document.getElementById('btnCoverDerecha');

            if (pistaCover && btnCoverIzquierda && btnCoverDerecha) {
                btnCoverDerecha.addEventListener('click', () => {
                    const anchoItem = pistaCover.querySelector('.item-carrusel-cover').clientWidth;
                    pistaCover.scrollBy({ left: anchoItem, behavior: 'smooth' });
                });

                btnCoverIzquierda.addEventListener('click', () => {
                    const anchoItem = pistaCover.querySelector('.item-carrusel-cover').clientWidth;
                    pistaCover.scrollBy({ left: -anchoItem, behavior: 'smooth' });
                });
            }
        });

        // Service Worker PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('../sw.js').then(reg => {
                    console.log('SW registrado', reg.scope);
                }).catch(err => console.error('SW Fallo', err));
            });
        }

                document.addEventListener('DOMContentLoaded', () => {
            const pistaLabores = document.getElementById('pistaCoverLabores');
            const btnIzquierdaLabores = document.getElementById('btnCoverIzquierdaLabores');
            const btnDerechaLabores = document.getElementById('btnCoverDerechaLabores');

            if(pistaLabores && btnIzquierdaLabores && btnDerechaLabores) {
                btnDerechaLabores.addEventListener('click', () => {
                    pistaLabores.scrollBy({ left: pistaLabores.clientWidth, behavior: 'smooth' });
                });
                btnIzquierdaLabores.addEventListener('click', () => {
                    pistaLabores.scrollBy({ left: -pistaLabores.clientWidth, behavior: 'smooth' });
                });
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
    const pistaPersonal = document.getElementById('pistaCoverPersonal');
    const btnIzquierdaPersonal = document.getElementById('btnCoverIzquierdaPersonal');
    const btnDerechaPersonal = document.getElementById('btnCoverDerechaPersonal');

    if (pistaPersonal && btnIzquierdaPersonal && btnDerechaPersonal) {
        btnDerechaPersonal.addEventListener('click', () => {
            pistaPersonal.scrollBy({ 
                left: pistaPersonal.clientWidth, 
                behavior: 'smooth' 
            });
        });

        btnIzquierdaPersonal.addEventListener('click', () => {
            pistaPersonal.scrollBy({ 
                left: -pistaPersonal.clientWidth, 
                behavior: 'smooth' 
            });
        });
    }
});