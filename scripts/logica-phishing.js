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

function analizarUrl(tarjeta) {
    // Evitar doble clic
    if (tarjeta.classList.contains('analizada')) return;
    tarjeta.classList.add('analizada');

    const estado = tarjeta.querySelector('.url-estado');
    const instruccion = tarjeta.querySelector('.url-instruccion');
    const badge = tarjeta.querySelector('.url-badge');

    // Determinar tipo por la clase del badge
    if (badge) {
        if (badge.classList.contains('segura')) {
            tarjeta.classList.add('url-segura');
        } else if (badge.classList.contains('peligrosa')) {
            tarjeta.classList.add('url-peligrosa');
        } else if (badge.classList.contains('dudosa')) {
            tarjeta.classList.add('url-dudosa');
        }
    }

    // Ocultar instrucción y mostrar análisis
    if (instruccion) instruccion.style.display = 'none';
    if (estado) estado.style.display = 'block';

    // Actualizar barra de progreso
    urlsAnalizadas++;
    const contador = document.getElementById('urls-revisadas');
    const barraRelleno = document.getElementById('barra-urls');
    if (contador) contador.textContent = urlsAnalizadas;
    if (barraRelleno) barraRelleno.style.width = ((urlsAnalizadas / 6) * 100) + '%';

    // Si completó todas, mostrar felicitación
    if (urlsAnalizadas === 6) {
        setTimeout(function () {
            const progreso = document.querySelector('.verificador-progreso');
            if (progreso) {
                progreso.innerHTML += '<div style="margin-top:0.75rem;padding:0.75rem 1.25rem;background:#14532d;color:#86efac;border-radius:0.75rem;font-size:0.9rem;font-weight:700;">&#x1F3C6; ¡Excelente! Analizaste los 6 enlaces. Ya sabes detectar URLs peligrosas.</div>';
            }
        }, 400);
    }
}
