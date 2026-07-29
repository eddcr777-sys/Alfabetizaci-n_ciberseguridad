/* LOGICA AUDITORIA DIGITAL MEJORADA */

function revelarPost(elemento) {
    elemento.classList.toggle('revelado');

    const mensaje = elemento.querySelector('.mensaje-explicativo');
    if (elemento.classList.contains('revelado')) {
        mensaje.style.display = 'flex'; // Se vuelve visible
        mensaje.style.backgroundColor = '#e0f2fe'; // Ejemplo: fondo azul clarito al revelar
    } else {
        mensaje.style.display = 'none'; // Vuelve a ocultarse
        mensaje.style.backgroundColor = 'transparent'; // Vuelve al fondo original
    }
    elemento.style.backgroundColor = 'transparent';
}




// Toggle de Checkboxes corrigiendo la doble negación booleana
function toggleCheckbox(evento, item) {
    // Si el usuario hizo clic directamente en el <input>, evitamos invertir el valor otra vez
    if (evento.target.tagName.toLowerCase() === 'input') {
        actualizarSeguridad();
        return;
    }
    
    const cb = item.querySelector('.checkbox-auditoria');
    if (cb) {
        cb.checked = !cb.checked; // Solo invertimos si se hizo clic en el contenedor exterior
        actualizarSeguridad();
    }
}

// Centralizamos la actualización visual de la seguridad
function actualizarSeguridad() {
    const checkboxes = document.querySelectorAll('.checkbox-auditoria');
    const barra = document.getElementById('barra-seguridad-relleno');
    const texto = document.getElementById('texto-progreso');
    const total = checkboxes.length;
    let marcados = 0;

    checkboxes.forEach(cb => {
        const padre = cb.closest('.item-auditoria');
        if (cb.checked) {
            marcados++;
            if (padre) padre.classList.add('activo');
        } else {
            if (padre) padre.classList.remove('activo');
        }
    });

    const porcentaje = Math.round((marcados / total) * 100);

    if (barra) barra.style.width = porcentaje + '%';
    if (texto) texto.textContent = `Nivel de Seguridad: ${porcentaje}%`;
}

// Alternar Modo Oscuro
function alternarModoOscuro() {
    const body = document.body;
    body.classList.toggle('dark');
    const esOscuro = body.classList.contains('dark');
    localStorage.setItem('tema_preferido', esOscuro ? 'oscuro' : 'claro');
}

// Cargar Tema Guardado e inicializar eventos
window.addEventListener('DOMContentLoaded', () => {
    const temaGuardado = localStorage.getItem('tema_preferido');
    if (temaGuardado === 'oscuro') {
        document.body.classList.add('dark');
    }
    // Forzar actualización inicial de la barra por si el navegador guardó el estado de algún checkbox
    actualizarSeguridad();
});

// Registrar Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then(reg => {
            console.log('SW registrado correctamente', reg.scope);
        }).catch(err => console.error('Fallo en SW', err));
    });
}