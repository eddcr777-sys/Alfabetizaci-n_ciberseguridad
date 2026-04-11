function mostrarTrampa(id) {
    const msg = document.getElementById(id);
    msg.classList.add('visible');
    // scroll suave hacia el mensaje
    setTimeout(() => msg.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
}
