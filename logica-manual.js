// ============================================================
// LÓGICA MANUAL MAESTRO — Barra progreso, nav activa,
// estadísticas animadas, quiz interactivo, botón subir
// ============================================================

// ── 1. BARRA DE PROGRESO DE LECTURA ──────────────────────
window.addEventListener('scroll', function () {
    const docAltura = document.documentElement.scrollHeight - window.innerHeight;
    const porcentaje = docAltura > 0 ? (window.scrollY / docAltura) * 100 : 0;
    const barra = document.getElementById('barra-lectura-relleno');
    if (barra) barra.style.width = porcentaje + '%';

    // Botón flotante "volver arriba"
    const boton = document.getElementById('boton-subir');
    if (boton) {
        boton.style.display = window.scrollY > 400 ? 'flex' : 'none';
    }
});

// ── 2. NAVEGACIÓN ACTIVA EN SIDEBAR ──────────────────────
const secciones = document.querySelectorAll('section[id]');
const itemsNavegacion = document.querySelectorAll('.item-navegacion');

const observadorNav = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            const idActual = entrada.target.getAttribute('id');
            itemsNavegacion.forEach(function (item) {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + idActual) {
                    item.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-30% 0px -65% 0px' });

secciones.forEach(function (sec) { observadorNav.observe(sec); });

// ── 3. ESTADÍSTICAS ANIMADAS (contadores) ────────────────
function animarContador(elemento, objetivo, sufijo) {
    sufijo = sufijo || '%';
    let actual = 0;
    const duracion = 1800;
    const pasos = 60;
    const incremento = objetivo / pasos;
    const intervalo = duracion / pasos;

    const temporizador = setInterval(function () {
        actual += incremento;
        if (actual >= objetivo) {
            actual = objetivo;
            clearInterval(temporizador);
        }
        elemento.textContent = Math.round(actual) + (objetivo === 1 ? '' : sufijo);
    }, intervalo);
}

// Usar IntersectionObserver para disparar cuando sean visibles
const contenedorEstadisticas = document.getElementById('contador-1');
if (contenedorEstadisticas) {
    const obsContadores = new IntersectionObserver(function (entradas) {
        if (entradas[0].isIntersecting) {
            animarContador(document.getElementById('contador-1'), 83, '%');
            animarContador(document.getElementById('contador-2'), 1, '');
            animarContador(document.getElementById('contador-3'), 70, '%');
            obsContadores.disconnect();
        }
    }, { threshold: 0.5 });
    obsContadores.observe(contenedorEstadisticas);
}

// ── 4. QUIZ INTERACTIVO ───────────────────────────────────
const feedbackTextos = {
    correcto: [
        '✅ ¡Correcto! Eso es exactamente lo que haría un ciudadano digital inteligente.',
        '✅ ¡Perfecto! Tienes buenos instintos de seguridad.',
        '✅ ¡Muy bien! Esa es la decisión correcta.',
        '✅ ¡Excelente! Esa es la actitud de alguien que cuida su seguridad.',
        '✅ ¡Correcto! Sabías exactamente qué hace el 2FA.',
    ],
    incorrecto: [
        '❌ Incorrecto. Esa respuesta te haría caer en una trampa de phishing. Nunca hagas clic en enlaces urgentes.',
        '❌ Incorrecto. Las contraseñas cortas y simples se descifran en segundos. Necesitas mezcla de letras, números y símbolos.',
        '❌ Incorrecto. Dar datos a desconocidos en línea es peligroso aunque lleven mucho tiempo hablándote.',
        '❌ Incorrecto. Los programas piratas casi siempre contienen virus ocultos. Hay alternativas legales gratuitas.',
        '❌ Incorrecto. El 2FA es un código de seguridad extra que protege tu cuenta aunque el atacante ya tenga tu contraseña.',
    ],
};

let preguntaActual = 0;
let puntajeTotal = 0;
let quizTerminado = false;

document.addEventListener('DOMContentLoaded', function () {
    const preguntas = document.querySelectorAll('.quiz-pregunta');
    if (preguntas.length === 0) return;

    // Mostrar solo la primera pregunta al inicio
    preguntas.forEach(function (p, i) {
        p.style.display = i === 0 ? 'block' : 'none';
    });

    // Asignar eventos a todos los botones de opción
    document.querySelectorAll('.quiz-opcion').forEach(function (boton) {
        boton.addEventListener('click', function () {
            if (quizTerminado) return;

            const preguntaDiv = this.closest('.quiz-pregunta');
            // Evitar doble respuesta en la misma pregunta
            if (preguntaDiv.classList.contains('respondida')) return;
            preguntaDiv.classList.add('respondida');

            const correcta = preguntaDiv.dataset.correcta;
            const elegida = this.dataset.valor;
            const esCorrecta = elegida === correcta;
            const feedback = preguntaDiv.querySelector('.quiz-feedback');
            const indice = Array.from(preguntas).indexOf(preguntaDiv);

            if (esCorrecta) puntajeTotal++;

            // Resaltar opciones
            preguntaDiv.querySelectorAll('.quiz-opcion').forEach(function (btn) {
                btn.disabled = true;
                if (btn.dataset.valor === correcta) {
                    btn.classList.add('opcion-correcta');
                } else if (btn.dataset.valor === elegida && !esCorrecta) {
                    btn.classList.add('opcion-incorrecta');
                }
            });

            // Mostrar feedback
            feedback.textContent = esCorrecta
                ? feedbackTextos.correcto[indice]
                : feedbackTextos.incorrecto[indice];
            feedback.style.display = 'block';
            feedback.className = 'quiz-feedback ' + (esCorrecta ? 'feedback-correcto' : 'feedback-incorrecto');

            // Ir a siguiente pregunta o mostrar resultado
            setTimeout(function () {
                preguntaActual++;
                if (preguntaActual < preguntas.length) {
                    preguntas[preguntaActual].style.display = 'block';
                    preguntas[preguntaActual].scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    mostrarResultadoQuiz(preguntas.length);
                }
            }, 1800);
        });
    });
});

function mostrarResultadoQuiz(total) {
    quizTerminado = true;
    const resultado = document.getElementById('quiz-resultado-final');
    if (!resultado) return;

    const porcentaje = Math.round((puntajeTotal / total) * 100);
    let emoji, mensaje, color, colorBorde;

    if (puntajeTotal === total) {
        emoji = '🏆'; mensaje = '¡Perfecto! Eres un Ciudadano Digital modelo. Comparte este manual con tus compañeros.';
        color = '#d4af37'; colorBorde = '#92400e';
    } else if (puntajeTotal >= 4) {
        emoji = '🛡️'; mensaje = 'Excelente nivel de seguridad. Repasa los temas donde fallaste para ser el mejor.';
        color = '#22c55e'; colorBorde = '#14532d';
    } else if (puntajeTotal >= 3) {
        emoji = '⚡'; mensaje = 'Bien, pero hay áreas que necesitas reforzar. Lee nuevamente los capítulos relacionados.';
        color = '#f59e0b'; colorBorde = '#78350f';
    } else {
        emoji = '📚'; mensaje = 'Necesitas repasar el manual con más atención. Tu seguridad digital depende de ello.';
        color = '#ef4444'; colorBorde = '#7f1d1d';
    }

    resultado.style.display = 'block';
    resultado.style.background = 'rgba(255,255,255,0.07)';
    resultado.style.border = '3px solid ' + colorBorde;
    resultado.innerHTML = `
        <div style="font-size:3.5rem;margin-bottom:0.75rem;">${emoji}</div>
        <div style="font-size:2.5rem;font-weight:900;color:${color};margin-bottom:0.5rem;">
            ${puntajeTotal} / ${total}
        </div>
        <div style="font-size:1rem;font-weight:700;color:rgba(255,255,255,0.75);margin-bottom:1rem;">
            ${mensaje}
        </div>
        <div style="background:rgba(255,255,255,0.1);border-radius:999px;height:12px;overflow:hidden;max-width:300px;margin:0 auto;">
            <div style="width:${porcentaje}%;height:100%;background:${color};border-radius:999px;transition:width 1s ease;"></div>
        </div>
        <p style="font-size:0.8rem;color:rgba(255,255,255,0.4);margin-top:1rem;">${porcentaje}% de respuestas correctas</p>
    `;
    resultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
