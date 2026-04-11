function marcarItem(el) {
    const checkbox = el.querySelector('input[type="checkbox"]');
    // evitar doble disparo
    el.classList.toggle('marcado', checkbox.checked);
    actualizarResultado();
}

function actualizarResultado() {
    const marcados = document.querySelectorAll('.item-lista-verificacion.marcado').length;
    const total = document.querySelectorAll('.item-lista-verificacion').length;
    const resultado = document.getElementById('resultadoPrivacidad');
    resultado.style.display = 'block';

    if (marcados === 0) {
        resultado.innerHTML = '<span class="status-danger">CRÍTICO — Tu perfil está completamente expuesto.</span>';
        resultado.style.background = '#ffebee'; resultado.style.color = '#b71c1c'; resultado.style.borderColor = '#b71c1c';
    } else if (marcados <= 2) {
        resultado.innerHTML = `<span class="status-warning">AVISO — Solo ${marcados} de ${total} protecciones activas. ¡Hay mucho por mejorar!</span>`;
        resultado.style.background = '#fff3e0'; resultado.style.color = '#e65100'; resultado.style.borderColor = '#e65100';
    } else if (marcados <= 4) {
        resultado.innerHTML = `<span class="status-medium">MODERADO — ${marcados} de ${total}: Vas bien, pero aún hay puntos vulnerables.</span>`;
        resultado.style.background = '#fffde7'; resultado.style.color = '#f57f17'; resultado.style.borderColor = '#f57f17';
    } else {
        resultado.innerHTML = `<span class="status-success">ÓPTIMO — ¡${marcados} de ${total}! Excelente. Tu perfil está muy bien protegido.</span>`;
        resultado.style.background = '#e8f5e9'; resultado.style.color = '#1b5e20'; resultado.style.borderColor = '#2e7d32';
    }
}
