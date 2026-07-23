/* LOGICA AUDITORIA DIGITAL */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Auditor de Algoritmos
    const posts = document.querySelectorAll('.tarjeta-post');
    posts.forEach(post => {
        post.addEventListener('click', () => {
            const esAlgoritmo = post.dataset.tipo === 'algoritmo';
            if (esAlgoritmo) {
                post.classList.toggle('marcado-algoritmo');
            } else {
                post.classList.toggle('marcado-organico');
            }
        });
    });

    // 2. Auditoría de Seguridad
    const checkboxes = document.querySelectorAll('.checkbox-auditoria');
    const barraRelleno = document.getElementById('barra-seguridad-relleno');
    const totalChecks = checkboxes.length;

    const actualizarBarra = () => {
        const marcados = document.querySelectorAll('.checkbox-auditoria:checked').length;
        const porcentaje = (marcados / totalChecks) * 100;
        if (barraRelleno) {
            barraRelleno.style.width = `${porcentaje}%`;
        }
    };

    checkboxes.forEach(check => {
        post.addEventListener('change', actualizarBarra);
    });
});

 function revelarPost(elemento) {
      elemento.classList.toggle('revelado');
    }

    // Toggle de Checkboxes al hacer clic en el contenedor
    function toggleCheckbox(item) {
      const cb = item.querySelector('.checkbox-auditoria');
      cb.checked = !cb.checked;
      item.classList.toggle('activo', cb.checked);
      actualizarSeguridad();
    }

    // Actualizar Barra de Progreso de Seguridad
    function actualizarSeguridad() {
      const checkboxes = document.querySelectorAll('.checkbox-auditoria');
      const total = checkboxes.length;
      let marcados = 0;

      checkboxes.forEach(cb => {
        const padre = cb.closest('.item-auditoria');
        if (cb.checked) {
          marcados++;
          padre.classList.add('activo');
        } else {
          padre.classList.remove('activo');
        }
      });

      const porcentaje = Math.round((marcados / total) * 100);
      const barra = document.getElementById('barra-seguridad-relleno');
      const texto = document.getElementById('texto-progreso');

      barra.style.width = porcentaje + '%';
      texto.textContent = `Nivel de Seguridad: ${porcentaje}%`;
    }

    // Alternar Modo Oscuro
    function alternarModoOscuro() {
      const body = document.body;
      body.classList.toggle('modo-oscuro');
      const esOscuro = body.classList.contains('modo-oscuro');

      document.getElementById('icono-tema').textContent = esOscuro ? 'light_mode' : 'dark_mode';
      document.getElementById('texto-tema').textContent = esOscuro ? 'Tema Claro' : 'Tema Oscuro';

      localStorage.setItem('tema_preferido', esOscuro ? 'oscuro' : 'claro');
    }

    // Cargar Tema Guardado
    window.addEventListener('DOMContentLoaded', () => {
      const temaGuardado = localStorage.getItem('tema_preferido');
      if (temaGuardado === 'oscuro') {
        document.body.classList.add('modo-oscuro');
        document.getElementById('icono-tema').textContent = 'light_mode';
        document.getElementById('texto-tema').textContent = 'Tema Claro';
      }
    });

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then(reg => {
          console.log('SW registrado correctamente', reg.scope);
        }).catch(err => console.error('Fallo en SW', err));
      });
    }
