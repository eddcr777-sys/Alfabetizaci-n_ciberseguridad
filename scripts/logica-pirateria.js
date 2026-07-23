document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Botón Trampa del Taller y Reinicio
    const botonTrampa = document.getElementById('btn-descarga-taller');
    const mensajeTrampa = document.getElementById('mensaje-alerta-taller');
    const botonReiniciarTaller = document.getElementById('btn-reiniciar-taller');

    if (botonTrampa && mensajeTrampa) {
        botonTrampa.addEventListener('click', () => {
            mensajeTrampa.classList.add('visible');
            botonTrampa.style.display = 'none'; // Ocultar botón de descarga al caer
            setTimeout(() => mensajeTrampa.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
        });
    }

    if (botonReiniciarTaller && mensajeTrampa && botonTrampa) {
        botonReiniciarTaller.addEventListener('click', () => {
            mensajeTrampa.classList.remove('visible');
            botonTrampa.style.display = 'inline-flex'; // Mostrar botón de nuevo
        });
    }

    // 2. Lógica del Quiz Interactivo y Reinicio
    const botonesQuiz = document.querySelectorAll('.btn-option');
    const feedback = document.getElementById('feedback-quiz');
    const botonReiniciarQuiz = document.getElementById('btn-reiniciar-quiz');

    botonesQuiz.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const contenedorOpciones = e.currentTarget.parentElement;
            const opciones = contenedorOpciones.querySelectorAll('.btn-option');
            
            opciones.forEach(opt => {
                opt.style.pointerEvents = 'none';
            });

            if (feedback) {
                feedback.style.display = 'block';
                const esCorrecto = e.currentTarget.getAttribute('data-correcto') === 'true';

                if (esCorrecto) {
                    e.currentTarget.classList.add('correcto');
                    feedback.style.color = 'var(--primary-color)';
                    feedback.textContent = '¡Correcto! Desactivar el antivirus es la señal más clara de que el software contiene un virus o troyano oculto.';
                } else {
                    e.currentTarget.classList.add('incorrecto');
                    feedback.style.color = 'var(--danger-color)';
                    feedback.textContent = 'Incorrecto. Desactivar la protección de tu equipo expone inmediatamente tu sistema a cualquier malware malicioso.';
                }

                if (botonReiniciarQuiz) {
                    botonReiniciarQuiz.style.display = 'inline-flex';
                }
            }
        });
    });

    if (botonReiniciarQuiz) {
        botonReiniciarQuiz.addEventListener('click', () => {
            botonesQuiz.forEach(opt => {
                opt.style.pointerEvents = 'auto';
                opt.classList.remove('correcto', 'incorrecto');
            });
            if (feedback) {
                feedback.style.display = 'none';
                feedback.textContent = '';
            }
            botonReiniciarQuiz.style.display = 'none';
        });
    }

    // 3. Lógica del Cambio de Tema (Claro / Oscuro)
    const btnTema = document.getElementById('btn-modo');
    if (btnTema) {
        if (localStorage.getItem('tema-usuario') === 'dark') {
            document.documentElement.classList.add('dark');
            const icono = document.getElementById('icono-modo');
            if (icono) icono.textContent = 'light_mode';
        }

        btnTema.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const esOscuro = document.documentElement.classList.contains('dark');
            const icono = document.getElementById('icono-modo');
            if (icono) {
                icono.textContent = esOscuro ? 'light_mode' : 'dark_mode';
            }
            localStorage.setItem('tema-usuario', esOscuro ? 'dark' : 'light');
        });
    }
});