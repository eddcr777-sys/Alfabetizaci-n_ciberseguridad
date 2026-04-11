// MEDIDOR DE CONTRASEÑA
const claveInput = document.getElementById('claveInput');
const barraRelleno = document.getElementById('barraRelleno');
const etiquetaFuerza = document.getElementById('etiquetaFuerza');

claveInput.addEventListener('input', function() {
    const val = this.value;
    let puntaje = 0;

    const tieneLargo = val.length >= 10;
    const tieneMayus = /[A-Z]/.test(val);
    const tieneNum = /[0-9]/.test(val);
    const tieneSimbolo = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    if (tieneLargo) puntaje += 25;
    if (tieneMayus) puntaje += 25;
    if (tieneNum) puntaje += 25;
    if (tieneSimbolo) puntaje += 25;

    actualizarCheck('checkLargo', tieneLargo, 'Al menos 10 caracteres');
    actualizarCheck('checkMayus', tieneMayus, 'Letra MAYÚSCULA');
    actualizarCheck('checkNum', tieneNum, 'Número (1, 2, 3...)');
    actualizarCheck('checkSimbolo', tieneSimbolo, 'Símbolo (@, #, $, !)');

    barraRelleno.style.width = puntaje + '%';

    if (val.length === 0) {
        barraRelleno.style.background = '#ccc';
        etiquetaFuerza.textContent = 'Escribe para analizar...';
        etiquetaFuerza.style.color = '#888';
    } else if (puntaje <= 25) {
        barraRelleno.style.background = '#f44336';
        etiquetaFuerza.innerHTML = '<span class="status-danger">CRÍTICO — Un atacante la adivinaría en segundos.</span>';
        etiquetaFuerza.style.color = '#f44336';
    } else if (puntaje <= 50) {
        barraRelleno.style.background = '#ff9800';
        etiquetaFuerza.innerHTML = '<span class="status-warning">DÉBIL — Mejórala añadiendo más tipos de caracteres.</span>';
        etiquetaFuerza.style.color = '#ff9800';
    } else if (puntaje <= 75) {
        barraRelleno.style.background = '#ffc107';
        etiquetaFuerza.innerHTML = '<span class="status-medium">ACEPTABLE — Añade un símbolo para hacerla más fuerte.</span>';
        etiquetaFuerza.style.color = '#f57f17';
    } else {
        barraRelleno.style.background = '#004d40';
        etiquetaFuerza.innerHTML = '<span class="status-success">¡EXCELENTE! Esta contraseña es muy difícil de romper.</span>';
        etiquetaFuerza.style.color = '#004d40';
    }
});

function actualizarCheck(id, activo, texto) {
    const el = document.getElementById(id);
    const icono = activo ? '<span class="material-symbols-outlined text-green-600 align-middle">check_circle</span> ' : '<span class="material-symbols-outlined text-slate-300 align-middle">radio_button_unchecked</span> ';
    el.innerHTML = icono + texto;
    el.classList.toggle('activo', activo);
}

// QUIZ
function revelarQuiz(el) {
    el.classList.add('revelado');
    const seguro = el.dataset.seguro === 'si';
    el.classList.toggle('seguro', seguro);
    el.classList.toggle('inseguro', !seguro);
}
