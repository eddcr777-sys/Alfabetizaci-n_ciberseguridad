/* LOGICA AUDITORIA DIGITAL */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Auditor de Algoritmos
    const posts = document.querySelectorAll('.tarjeta-post');
    posts.forEach(post => {
        post.addEventListener('click', () => {
            const esAlgoritmo = post.dataset.tipo === 'algoritmo';
            if (esAlgoritmo) {
                post.classList.toggle('marcado-algoritmo');
            } else {
                post.classList.toggle('marcado-organico');
            }
        });
    });

    // 2. Auditoría de Seguridad
    const checkboxes = document.querySelectorAll('.checkbox-auditoria');
    const barraRelleno = document.getElementById('barra-seguridad-relleno');
    const totalChecks = checkboxes.length;

    const actualizarBarra = () => {
        const marcados = document.querySelectorAll('.checkbox-auditoria:checked').length;
        const porcentaje = (marcados / totalChecks) * 100;
        if (barraRelleno) {
            barraRelleno.style.width = `${porcentaje}%`;
        }
    };

    checkboxes.forEach(check => {
        post.addEventListener('change', actualizarBarra);
    });
});
