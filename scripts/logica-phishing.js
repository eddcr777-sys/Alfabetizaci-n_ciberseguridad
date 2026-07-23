// ============================================================
// MÓDULO PHISHING: Señales de correo + Verificador de URLs
// ============================================================

// ── 1. SEÑALES DE ALARMA EN EL SIMULADOR DE CORREO ──────
function revelarDireccion(elemento) {
    const tipo = elemento.dataset.tipo;
    elemento.classList.add('revelado', tipo);
}

// ── 2. VERIFICADOR DE URLs INTERACTIVO ───────────────────
let urlsAnalizadas = 0;
const totalUrls = 6;

function analizarUrl(tarjeta) {
    // Evitar doble clic
    if (tarjeta.classList.contains('analizada')) return;
    tarjeta.classList.add('analizada');

    // CORRECCIÓN: Apuntar a '.url-status' en lugar de '.url-estado'
    const estado = tarjeta.querySelector('.url-status');
    const instruccion = tarjeta.querySelector('.url-instruccion');
    const badge = tarjeta.querySelector('.url-badge');

    // Asignar color de borde o fondo a la tarjeta según el tipo de alerta
    if (badge) {
        if (badge.classList.contains('secure')) {
            tarjeta.classList.add('url-segura');
        } else if (badge.classList.contains('danger')) {
            tarjeta.classList.add('url-peligrosa');
        } else if (badge.classList.contains('dubious')) {
            tarjeta.classList.add('url-dudosa');
        }
    }

    // Ocultar instrucción y mostrar el análisis oculto
    if (instruccion) instruccion.style.display = 'none';
    if (estado) {
        estado.classList.remove('hidden');
        estado.style.display = 'block';
    }

    // Actualizar barra de progreso
    urlsAnalizadas++;
    const contador = document.getElementById('urls-revisadas');
    const barraRelleno = document.getElementById('barra-urls');
    
    if (contador) contador.textContent = urlsAnalizadas;
    if (barraRelleno) {
        barraRelleno.style.width = ((urlsAnalizadas / totalUrls) * 100) + '%';
    }

    // Si completó todas, mostrar mensaje de felicitación
    if (urlsAnalizadas === totalUrls) {
        setTimeout(function () {
            const progreso = document.querySelector('.verifier-progress');
            if (progreso && !document.getElementById('mensaje-exito')) {
                const mensaje = document.createElement('div');
                mensaje.id = 'mensaje-exito';
                mensaje.style.cssText = 'margin-top:0.75rem; padding:0.75rem 1.25rem; background:#14532d; color:#86efac; border-radius:0.75rem; font-size:0.9rem; font-weight:700; text-align:center;';
                mensaje.innerHTML = '🏆 ¡Excelente! Analizaste los 6 enlaces. Ya sabes detectar URLs peligrosas.';
                progreso.appendChild(mensaje);
            }
        }, 400);
    }
}