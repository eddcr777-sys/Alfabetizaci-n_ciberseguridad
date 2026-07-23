document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // LÓGICA DEL MODO OSCURO
    // ==========================================
    const btnTema = document.getElementById('btn-tema');
    const iconoTema = document.getElementById('icono-tema');
    const textoTema = document.getElementById('texto-tema');
    const htmlElement = document.documentElement;
    

    // Verificar preferencia guardada
    const temaGuardado = localStorage.getItem('temaSeguridad');
    if (temaGuardado === 'dark') {
        activarModoOscuro();
    }

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            if (htmlElement.getAttribute('data-theme') === 'light') {
                activarModoOscuro();
                localStorage.setItem('temaSeguridad', 'dark');
            } else {
                activarModoClaro();
                localStorage.setItem('temaSeguridad', 'light');
            }
        });
    }

    function activarModoOscuro() {
        htmlElement.setAttribute('data-theme', 'dark');
        if(iconoTema) iconoTema.textContent = 'light_mode';
        if(textoTema) textoTema.textContent = 'Modo Claro';
    }

    function activarModoClaro() {
        htmlElement.setAttribute('data-theme', 'light');
        if(iconoTema) iconoTema.textContent = 'dark_mode';
        if(textoTema) textoTema.textContent = 'Modo Oscuro';
    }

    // ==========================================
    // LÓGICA DEL MEDIDOR DE CONTRASEÑA
    // ==========================================
    const inputClave = document.getElementById('claveInput');
    const barra = document.getElementById('barraRelleno');
    const etiqueta = document.getElementById('etiquetaFuerza');

    const checkLargo = document.getElementById('checkLargo');
    const checkMayus = document.getElementById('checkMayus');
    const checkNum = document.getElementById('checkNum');
    const checkSimbolo = document.getElementById('checkSimbolo');

    if (inputClave) {
        inputClave.addEventListener('input', (e) => {
            const clave = e.target.value;
            let puntaje = 0;

            // Validaciones RegEx
            const tieneLargo = clave.length >= 10;
            const tieneMayus = /[A-Z]/.test(clave);
            const tieneNum = /[0-9]/.test(clave);
            const tieneSimbolo = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(clave);

            // Actualizar UI de los checks
            if (checkLargo) actualizarCheck(checkLargo, tieneLargo);
            if (checkMayus) actualizarCheck(checkMayus, tieneMayus);
            if (checkNum) actualizarCheck(checkNum, tieneNum);
            if (checkSimbolo) actualizarCheck(checkSimbolo, tieneSimbolo);

            // Calcular puntaje
            if (tieneLargo) puntaje += 25;
            if (tieneMayus) puntaje += 25;
            if (tieneNum) puntaje += 25;
            if (tieneSimbolo) puntaje += 25;

            // Actualizar Barra y Texto
            if (barra) barra.style.width = `${puntaje}%`;

            if (clave.length === 0) {
                if (etiqueta) etiqueta.textContent = "Esperando ingreso...";
                if (barra) {
                    barra.style.width = "0%";
                    barra.style.backgroundColor = "transparent";
                }
            } else if (puntaje <= 25) {
                if (barra) barra.style.backgroundColor = "#ef4444"; // Rojo
                if (etiqueta) {
                    etiqueta.textContent = "Débil";
                    etiqueta.style.color = "#ef4444";
                }
            } else if (puntaje <= 50) {
                if (barra) barra.style.backgroundColor = "#f59e0b"; // Naranja
                if (etiqueta) {
                    etiqueta.textContent = "Regular";
                    etiqueta.style.color = "#f59e0b";
                }
            } else if (puntaje <= 75) {
                if (barra) barra.style.backgroundColor = "#3b82f6"; // Azul
                if (etiqueta) {
                    etiqueta.textContent = "Buena";
                    etiqueta.style.color = "#3b82f6";
                }
            } else {
                if (barra) barra.style.backgroundColor = "#22c55e"; // Verde
                if (etiqueta) {
                    etiqueta.textContent = "¡Excelente y Segura!";
                    etiqueta.style.color = "#22c55e";
                }
            }
        });
    }

    function actualizarCheck(elemento, cumple) {
        const icono = elemento.querySelector('span');
        if (cumple) {
            elemento.classList.add('cumplido');
            if (icono) icono.textContent = 'check_circle';
        } else {
            elemento.classList.remove('cumplido');
            if (icono) icono.textContent = 'radio_button_unchecked';
        }
    }

    // ==========================================
    // LÓGICA DE LAS TARJETAS (Análisis y Videos)
    // ==========================================
    const botonesInteractivos = document.querySelectorAll('.btn-interactivo');

    botonesInteractivos.forEach(boton => {
        boton.addEventListener('click', () => {
            const tarjeta = boton.closest('.tarjeta-informacion');
            const estado = tarjeta.querySelector('.estado-evaluacion');
            const video = tarjeta.querySelector('.video-explicativo');

            // Comprobación de visibilidad inicial
            const estaOculto = estado.style.display === 'none' || estado.style.display === '';

            if (estaOculto) {
                estado.style.display = 'flex';
                if (video) video.style.display = 'block';
                boton.textContent = 'Ocultar análisis y ejemplo';
            } else {
                estado.style.display = 'none';
                if (video) video.style.display = 'none';
                boton.textContent = 'Ver análisis y ejemplo';
            }
        });
    });

    // ==========================================
    // LÓGICA DEL CUESTIONARIO (QUIZ)
    // ==========================================
    const preguntas = document.querySelectorAll('.pregunta-cuestionario');
    
    preguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
            const respuesta = pregunta.querySelector('.estado-evaluacion');
            if (respuesta) {
                if (respuesta.style.display === 'none' || respuesta.style.display === '') {
                    respuesta.style.display = 'flex';
                } else {
                    respuesta.style.display = 'none';
                }
            }
        });
    });

});

// Service Worker original
if ('serviceWorker' in navigator) {
    // registerServiceWorker();
    // registerSWUpdateUI();
}