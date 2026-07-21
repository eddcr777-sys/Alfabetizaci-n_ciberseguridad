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

    btnTema.addEventListener('click', () => {
        if (htmlElement.getAttribute('data-theme') === 'light') {
            activarModoOscuro();
            localStorage.setItem('temaSeguridad', 'dark');
        } else {
            activarModoClaro();
            localStorage.setItem('temaSeguridad', 'light');
        }
    });

    function activarModoOscuro() {
        htmlElement.setAttribute('data-theme', 'dark');
        iconoTema.textContent = 'light_mode';
        textoTema.textContent = 'Modo Claro';
    }

    function activarModoClaro() {
        htmlElement.setAttribute('data-theme', 'light');
        iconoTema.textContent = 'dark_mode';
        textoTema.textContent = 'Modo Oscuro';
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

    inputClave.addEventListener('input', (e) => {
        const clave = e.target.value;
        let puntaje = 0;

        // Validaciones RegEx
        const tieneLargo = clave.length >= 10;
        const tieneMayus = /[A-Z]/.test(clave);
        const tieneNum = /[0-9]/.test(clave);
        const tieneSimbolo = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(clave);

        // Actualizar UI de los checks
        actualizarCheck(checkLargo, tieneLargo);
        actualizarCheck(checkMayus, tieneMayus);
        actualizarCheck(checkNum, tieneNum);
        actualizarCheck(checkSimbolo, tieneSimbolo);

        // Calcular puntaje
        if (tieneLargo) puntaje += 25;
        if (tieneMayus) puntaje += 25;
        if (tieneNum) puntaje += 25;
        if (tieneSimbolo) puntaje += 25;

        // Actualizar Barra y Texto
        barra.style.width = `${puntaje}%`;

        if (clave.length === 0) {
            etiqueta.textContent = "Esperando ingreso...";
            barra.style.width = "0%";
        } else if (puntaje <= 25) {
            barra.style.backgroundColor = "#ef4444"; // Rojo
            etiqueta.textContent = "Débil";
            etiqueta.style.color = "#ef4444";
        } else if (puntaje <= 50) {
            barra.style.backgroundColor = "#f59e0b"; // Naranja
            etiqueta.textContent = "Regular";
            etiqueta.style.color = "#f59e0b";
        } else if (puntaje <= 75) {
            barra.style.backgroundColor = "#3b82f6"; // Azul
            etiqueta.textContent = "Buena";
            etiqueta.style.color = "#3b82f6";
        } else {
            barra.style.backgroundColor = "#22c55e"; // Verde
            etiqueta.textContent = "¡Excelente y Segura!";
            etiqueta.style.color = "#22c55e";
        }
    });

    function actualizarCheck(elemento, cumple) {
        const icono = elemento.querySelector('span');
        if (cumple) {
            elemento.classList.add('cumplido');
            icono.textContent = 'check_circle';
        } else {
            elemento.classList.remove('cumplido');
            icono.textContent = 'radio_button_unchecked';
        }
    }

    // ==========================================
    // LÓGICA DEL CUESTIONARIO (QUIZ)
    // ==========================================
    const preguntas = document.querySelectorAll('.pregunta-cuestionario');
    
    preguntas.forEach(pregunta => {
        pregunta.addEventListener('click', () => {
            // Revela el estado (peligroso/seguro) de la pregunta al hacer clic
            pregunta.classList.toggle('revelado');
        });
    });

});