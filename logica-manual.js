// Lógica para marcar sección activa en el sidebar al hacer scroll
const secciones = document.querySelectorAll('section');
const itemsNavegacion = document.querySelectorAll('.item-navegacion');

window.addEventListener('scroll', () => {
    let actual = '';
    secciones.forEach(seccion => {
        const desplazamientoSeccion = seccion.offsetTop;
        const alturaSeccion = seccion.clientHeight;
        if (pageYOffset >= (desplazamientoSeccion - 200)) {
            actual = seccion.getAttribute('id');
        }
    });

    itemsNavegacion.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${actual}`) {
            item.classList.add('active');
        }
    });
});
