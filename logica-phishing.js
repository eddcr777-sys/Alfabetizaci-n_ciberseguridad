function revelarDireccion(elemento) {
    const tipo = elemento.dataset.tipo;
    elemento.classList.add('revelado', tipo);
}
