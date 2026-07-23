document.addEventListener('DOMContentLoaded', () => {

    // ── 1. MODO OSCURO MEJORADO ────────────────────────
    const btnTema = document.getElementById('btn-tema');
    const iconoTema = document.getElementById('icono-tema');
    const textoTema = document.getElementById('texto-tema');

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const esOscuro = document.documentElement.classList.contains('dark');
            
            if (iconoTema) iconoTema.textContent = esOscuro ? 'light_mode' : 'dark_mode';
            if (textoTema) textoTema.textContent = esOscuro ? 'Modo Claro' : 'Modo Oscuro';
        });
    }

    // ── 2. BARRA DE PROGRESO DE LECTURA ───────────────
    window.addEventListener('scroll', () => {
        const docAltura = document.documentElement.scrollHeight - window.innerHeight;
        const porcentaje = docAltura > 0 ? (window.scrollY / docAltura) * 100 : 0;
        const barra = document.getElementById('barra-lectura-relleno');
        if (barra) barra.style.width = porcentaje + '%';
    });

    // ── 3. SCROLLSPY DE NAVEGACIÓN ─────────────────────
    const secciones = document.querySelectorAll('section[id]');
    const itemsNavegacion = document.querySelectorAll('.item-navegacion');

    if (secciones.length > 0 && itemsNavegacion.length > 0) {
        const observadorNav = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    const idActual = entrada.target.getAttribute('id');
                    itemsNavegacion.forEach((item) => {
                        item.classList.remove('activo');
                        if (item.getAttribute('href') === '#' + idActual) {
                            item.classList.add('activo');
                        }
                    });
                }
            });
        }, { rootMargin: '-20% 0px -60% 0px' });

        secciones.forEach((sec) => observadorNav.observe(sec));
    }

    // ── 4. LÓGICA DEL EXAMEN REBELDE (MEME EDITION) ────
    let puntajeTotal = 0;
    let preguntasRespondidas = 0;
    let rachaActual = 0;

    const feedbacksMeme = {
        exito: [
            "🚬 ABSOLUTE CINEMA. Mente de tiburón ciberseguro. Ni los hackers de la NASA te sacan esa respuesta.",
            "🔥 BASADO Esquivaste esa estafa como Neo en Matrix. Te ganas un boleto a la inmunidad digital.",
            "🛡️ GOD LEVEL. Estás tan blindado que hasta el 2FA te pide permiso a ti para generarse.",
            "😎 NADA DE SKILL ISSUE. Tienes los protocolos en las venas. Mantén la racha viva."
        ],
        error: [
            "🤡 MOMENT DE HUMILDAD. El hacker en estos momentos bailando porque le diste todo en bandeja de plata.",
            "❌ SKILL ISSUE DETECTADO. Esa respuesta la rompe hasta una calculadora Casio de 1998. Revisa ese capítulo urgente.",
            "☠️ F EN EL CHAT. Le acabas de regalar la cuenta al 'Tuki_Hacker_2026'. ¡Ponle mente a la seguridad!",
            "🤦‍♂️ NO MANES. Con esa decisión hasta la IA de tu teléfono se puso a llorar. Vuelve a leer la lección."
        ]
    };

    function inicializarQuiz() {
        const preguntas = document.querySelectorAll('.pregunta-cuestionario');
        if (preguntas.length === 0) return;

        document.querySelectorAll('.opcion-cuestionario').forEach((boton) => {
            boton.addEventListener('click', function() {
                const preguntaDiv = this.closest('.pregunta-cuestionario');
                if (preguntaDiv.classList.contains('respondida')) return;
                
                preguntaDiv.classList.add('respondida');
                preguntasRespondidas++;

                const correcta = preguntaDiv.dataset.correcta;
                const elegida = this.dataset.valor;
                const esCorrecta = elegida === correcta;
                const feedback = preguntaDiv.querySelector('.retroalimentacion-cuestionario');

                // Lógica de Racha y Puntaje
                const contadorRacha = document.getElementById('contador-racha');
                const textoEstado = document.getElementById('texto-estado');

                if (esCorrecta) {
                    puntajeTotal++;
                    rachaActual++;
                    if (contadorRacha) contadorRacha.textContent = rachaActual;
                    if (textoEstado) textoEstado.textContent = "¡Racha en llamas! Sigue así. 🔥";
                } else {
                    rachaActual = 0;
                    if (contadorRacha) contadorRacha.textContent = rachaActual;
                    if (textoEstado) textoEstado.textContent = "Escudo perforado. Ojo pelao... ⚠️";
                    preguntaDiv.classList.add('shake');
                }

                // Deshabilitar botones de la pregunta respondida y aplicar colores
                preguntaDiv.querySelectorAll('.opcion-cuestionario').forEach((btn) => {
                    btn.disabled = true;
                    if (btn.dataset.valor === correcta) {
                        btn.classList.add('opcion-correcta');
                    } else if (btn.dataset.valor === elegida && !esCorrecta) {
                        btn.classList.add('opcion-incorrecta');
                    }
                });

                // Seleccionar meme aleatorio
                const arrayMeme = esCorrecta ? feedbacksMeme.exito : feedbacksMeme.error;
                const mensajeRandom = arrayMeme[Math.floor(Math.random() * arrayMeme.length)];

                if (feedback) {
                    feedback.classList.remove('oculto');
                    feedback.className = `retroalimentacion-cuestionario ${esCorrecta ? 'retro-exito' : 'retro-error'}`;
                    feedback.innerHTML = mensajeRandom;
                }

                // Evaluar si finalizó todas las preguntas
                if (preguntasRespondidas === preguntas.length) {
                    setTimeout(() => {
                        mostrarResultadoQuiz(preguntas.length);
                    }, 600);
                }
            });
        });

        // Event listener para el botón de reinicio
        const btnReiniciar = document.getElementById('btn-reiniciar-quiz');
        if (btnReiniciar) {
            btnReiniciar.addEventListener('click', reiniciarQuiz);
        }
    }

    function mostrarResultadoQuiz(total) {
        const resultadoContainer = document.getElementById('quiz-resultado-final');
        const memeIcono = document.getElementById('meme-icono');
        const titulo = document.getElementById('resultado-titulo');
        const subtexto = document.getElementById('resultado-subtexto');

        if (!resultadoContainer) return;

        const porcentaje = Math.round((puntajeTotal / total) * 100);
        resultadoContainer.classList.remove('oculto');

        if (porcentaje === 100) {
            if (memeIcono) memeIcono.textContent = "🗿";
            if (titulo) titulo.textContent = `¡100% PERFECCIÓN! (${puntajeTotal}/${total})`;
            if (subtexto) subtexto.innerHTML = "<strong>Nivel: Ciber-Dios Inviolable.</strong><br>Ni la CIA ni los hackers de Telegram pueden tocar tus datos. Tómate un café, te lo ganaste.";
        } else if (porcentaje >= 75) {
            if (memeIcono) memeIcono.textContent = "😎";
            if (titulo) titulo.textContent = `¡Casi Leyenda! (${puntajeTotal}/${total})`;
            if (subtexto) subtexto.innerHTML = "<strong>Nivel: Hacker Ético Casi Basado.</strong><br>Tienes muy buenos reflejos. Solo repasa el detalle que fallaste para no caer en trampas raras.";
        } else if (porcentaje >= 50) {
            if (memeIcono) memeIcono.textContent = "🧐";
            if (titulo) titulo.textContent = `Pasaste rascando... (${puntajeTotal}/${total})`;
            if (subtexto) subtexto.innerHTML = "<strong>Nivel: Ciudadano Promedio Vulnerable.</strong><br>Estás a un link de 'Monedas Gratis' de perder el Instagram. Repasa los capítulos del manual, compadre.";
        } else {
            if (memeIcono) memeIcono.textContent = "🤡";
            if (titulo) titulo.textContent = `Skill Issue Crítico: (${puntajeTotal}/${total})`;
            if (subtexto) subtexto.innerHTML = "<strong>Nivel: Premio Nobel al Más Extorsionable.</strong><br>Te urgiría leer el manual desde el Capítulo 01 antes de que te vendan el puente María Cristina por WhatsApp.";
        }

        resultadoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function reiniciarQuiz() {
        puntajeTotal = 0;
        preguntasRespondidas = 0;
        rachaActual = 0;

        const contadorRacha = document.getElementById('contador-racha');
        const textoEstado = document.getElementById('texto-estado');
        const resultadoFinal = document.getElementById('quiz-resultado-final');

        if (contadorRacha) contadorRacha.textContent = "0";
        if (textoEstado) textoEstado.textContent = "Reintentando el desafío...";
        if (resultadoFinal) resultadoFinal.classList.add('oculto');

        document.querySelectorAll('.pregunta-cuestionario').forEach((pregunta) => {
            pregunta.classList.remove('respondida', 'shake');
            const feedback = pregunta.querySelector('.retroalimentacion-cuestionario');
            if (feedback) feedback.classList.add('oculto');
            
            pregunta.querySelectorAll('.opcion-cuestionario').forEach((btn) => {
                btn.disabled = false;
                btn.classList.remove('opcion-correcta', 'opcion-incorrecta');
            });
        });

        const quizFinalSec = document.getElementById('quiz-final');
        if (quizFinalSec) quizFinalSec.scrollIntoView({ behavior: 'smooth' });
    }

    // Inicializar el cuestionario al cargar el DOM
    inicializarQuiz();
});