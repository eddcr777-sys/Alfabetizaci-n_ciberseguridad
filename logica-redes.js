// ===================================================
// TALLER: AUDITORÍA DE PERFIL
// Escucha cambios solo en los checkboxes para evitar
// el doble disparo que causaba el onclick en el div.
// ===================================================

document.addEventListener('DOMContentLoaded', function () {
    const todosLosItems = document.querySelectorAll('.item-lista-verificacion');

    todosLosItems.forEach(function (item) {
        const caja = item.querySelector('input[type="checkbox"]');

        // Clic en el div: activar el checkbox interno
        item.addEventListener('click', function (evento) {
            // Evitar que el clic en el propio checkbox lo procese dos veces
            if (evento.target === caja) return;
            caja.checked = !caja.checked;
            actualizarEstadoItem(item, caja.checked);
            actualizarResultado();
        });

        // Clic directo en el checkbox (también lo manejamos)
        caja.addEventListener('change', function () {
            actualizarEstadoItem(item, caja.checked);
            actualizarResultado();
        });
    });

    // Mostrar resultado inicial al cargar (todo sin marcar)
    actualizarResultado();
});

function actualizarEstadoItem(item, estaMarcado) {
    item.classList.toggle('marcado', estaMarcado);
}

function actualizarResultado() {
    const totalItems = document.querySelectorAll('.item-lista-verificacion');
    const marcados = document.querySelectorAll('.item-lista-verificacion.marcado').length;
    const total = totalItems.length;
    const resultado = document.getElementById('resultadoPrivacidad');

    if (!resultado) return;

    resultado.style.display = 'block';
    resultado.style.transition = 'all 0.4s ease';

    // Calcular porcentaje
    const porcentaje = total > 0 ? Math.round((marcados / total) * 100) : 0;

    if (marcados === 0) {
        resultado.innerHTML = `
            <div style="font-size:2rem;margin-bottom:0.5rem;">🚨</div>
            <strong>CRÍTICO — Tu perfil está completamente expuesto.</strong>
            <div style="font-size:0.9rem;margin-top:0.5rem;font-weight:600;">Activa al menos una medida de seguridad para comenzar.</div>
            <div class="barra-progreso-contenedor"><div class="barra-progreso-relleno" style="width:${porcentaje}%;background:#b71c1c;"></div></div>
        `;
        resultado.style.background = '#ffebee';
        resultado.style.color = '#b71c1c';
        resultado.style.borderColor = '#b71c1c';
    } else if (marcados <= 2) {
        resultado.innerHTML = `
            <div style="font-size:2rem;margin-bottom:0.5rem;">⚠️</div>
            <strong>AVISO — Solo ${marcados} de ${total} protecciones activas (${porcentaje}%). ¡Hay mucho por mejorar!</strong>
            <div style="font-size:0.9rem;margin-top:0.5rem;font-weight:600;">Activa más medidas para proteger tu privacidad.</div>
            <div class="barra-progreso-contenedor"><div class="barra-progreso-relleno" style="width:${porcentaje}%;background:#e65100;"></div></div>
        `;
        resultado.style.background = '#fff3e0';
        resultado.style.color = '#e65100';
        resultado.style.borderColor = '#e65100';
    } else if (marcados <= 4) {
        resultado.innerHTML = `
            <div style="font-size:2rem;margin-bottom:0.5rem;">🟡</div>
            <strong>MODERADO — ${marcados} de ${total} (${porcentaje}%): Vas bien, pero aún tienes puntos vulnerables.</strong>
            <div style="font-size:0.9rem;margin-top:0.5rem;font-weight:600;">¡Casi lo logras! Activa las protecciones que faltan.</div>
            <div class="barra-progreso-contenedor"><div class="barra-progreso-relleno" style="width:${porcentaje}%;background:#f57f17;"></div></div>
        `;
        resultado.style.background = '#fffde7';
        resultado.style.color = '#f57f17';
        resultado.style.borderColor = '#f57f17';
    } else {
        resultado.innerHTML = `
            <div style="font-size:2rem;margin-bottom:0.5rem;">🛡️</div>
            <strong>ÓPTIMO — ¡${marcados} de ${total} (${porcentaje}%)! Excelente. Tu perfil está muy bien protegido.</strong>
            <div style="font-size:0.9rem;margin-top:0.5rem;font-weight:600;">¡Felicidades! Eres un ciudadano digital responsable.</div>
            <div class="barra-progreso-contenedor"><div class="barra-progreso-relleno" style="width:${porcentaje}%;background:#1b5e20;"></div></div>
        `;
        resultado.style.background = '#e8f5e9';
        resultado.style.color = '#1b5e20';
        resultado.style.borderColor = '#2e7d32';
    }
}
