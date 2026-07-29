/**
 * Service Worker - Alfabetización Digital LBALP
 * Estrategia: Cache-First con actualización en segundo plano.
 * Al instalar, precachea TODOS los recursos del sitio para funcionamiento offline total.
 */

// Incrementar la versión cada vez que se agreguen o modifiquen recursos.
const NOMBRE_CACHE = 'lbalp-cache-v5';

// Lista completa de todos los recursos del sitio
const RECURSOS_A_CACHEAR = [
  // Raíz
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',

  // ── Páginas ──────────────────────────────────────────────────────────────
  '/paginas/index.html',
  '/paginas/index2.html',
  '/paginas/index3.html',
  '/paginas/justificacion.html',
  '/paginas/nosotros.html',
  '/paginas/manual-estudiante.html',
  '/paginas/guia-completa.html',
  '/paginas/guia-docentes.html',
  '/paginas/guia-padres.html',
  '/paginas/phishing.html',
  '/paginas/auditoria-digital.html',
  '/paginas/proteccion-cuentas.html',
  '/paginas/protocolo-ayuda.html',
  '/paginas/redes-sociales.html',
  '/paginas/software-pirata.html',
  '/paginas/videojuegos.html',

  // ── Estilos ───────────────────────────────────────────────────────────────
  '/estilos/fuentes-locales.css',
  '/estilos/estilos-base.css',
  '/estilos/componentes-comunes.css',
  '/estilos/componentes-premium.css',
  '/estilos/main.css',
  '/estilos/utilidades-espanol.css',
  '/estilos/estilos-accesible.css',
  '/estilos/manual-estudiante.css',
  '/estilos/guia-completa.css',
  '/estilos/guia-docentes.css',
  '/estilos/guia-padres.css',
  '/estilos/phishing.css',
  '/estilos/estilos-phishing.css',
  '/estilos/auditoria-digital.css',
  '/estilos/proteccion-cuentas.css',
  '/estilos/protocolo-ayuda.css',
  '/estilos/redes-sociales.css',
  '/estilos/software-pirata.css',
  '/estilos/videojuegos.css',

  // ── Scripts ───────────────────────────────────────────────────────────────
  '/scripts/app.js',
  '/scripts/menu-movil.js',
  '/scripts/logica-tema.js',
  '/scripts/logica-manual.js',
  '/scripts/logica-phishing.js',
  '/scripts/logica-auditoria.js',
  '/scripts/logica-proteccion.js',
  '/scripts/logica-redes.js',
  '/scripts/logica-pirateria.js',
  '/scripts/logica-videojuegos.js',

  // ── Activos: Iconos ───────────────────────────────────────────────────────
  '/activos/iconos/icono.svg',
  '/activos/iconos/favicon.svg',
  '/activos/iconos/icons.svg',

  // ── Activos: Fuentes locales ──────────────────────────────────────────────
  '/activos/fuentes/manrope-latin.woff2',
  '/activos/fuentes/manrope-latin-ext.woff2',
  '/activos/fuentes/public-sans-latin.woff2',
  '/activos/fuentes/public-sans-latin-ext.woff2',
  '/activos/fuentes/material-symbols.woff2',

  // ── Imágenes ──────────────────────────────────────────────────────────────
  '/imagenes/images.jpeg',
  '/imagenes/le.jpeg',
  '/imagenes/lem.jpeg',
  '/imagenes/lemu.jpeg',
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. INSTALACIÓN: Pre-cachear todos los recursos críticos
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('install', (evento) => {
  console.log('[SW] Instalando y pre-cacheando recursos...');
  evento.waitUntil(
    caches.open(NOMBRE_CACHE).then((cache) => {
      // Cachear cada recurso individualmente para que un fallo no detenga los demás
      const promesas = RECURSOS_A_CACHEAR.map((url) =>
        cache.add(url).catch((err) => {
          console.warn('[SW] No se pudo cachear: ' + url, err);
        })
      );
      return Promise.all(promesas);
    }).then(() => {
      console.log('[SW] Pre-caché completado. Activando de inmediato.');
      return self.skipWaiting();
    })
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. ACTIVACIÓN: Eliminar cachés antiguas y tomar control de clientes
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('activate', (evento) => {
  console.log('[SW] Activado. Limpiando cachés antiguas...');
  evento.waitUntil(
    caches.keys().then((nombresCaches) => {
      return Promise.all(
        nombresCaches.map((nombre) => {
          if (nombre !== NOMBRE_CACHE) {
            console.log('[SW] Eliminando caché obsoleta:', nombre);
            return caches.delete(nombre);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. FETCH: Estrategia Cache-First
//    1° busca en caché (respuesta inmediata offline).
//    2° si no está, busca en red y guarda en caché para el futuro.
//    3° si no hay red y no hay caché, redirige al index principal.
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (evento) => {
  // Solo interceptar peticiones GET
  if (evento.request.method !== 'GET') return;

  // Ignorar URLs de extensiones del navegador u otros esquemas
  const url = new URL(evento.request.url);
  if (!['http:', 'https:'].includes(url.protocol)) return;

  evento.respondWith(
    caches.match(evento.request).then((respuestaCache) => {

      // ── Cache-Hit: servir desde caché ──────────────────────────────────
      if (respuestaCache) {
        // Revalidar en segundo plano si hay conexión
        fetch(evento.request).then((respuestaRed) => {
          if (respuestaRed && respuestaRed.ok) {
            caches.open(NOMBRE_CACHE).then((cache) => {
              cache.put(evento.request, respuestaRed);
            });
          }
        }).catch(() => { /* Sin red, se queda con la copia en caché */ });

        return respuestaCache;
      }

      // ── Cache-Miss: buscar en red y guardar ────────────────────────────
      return fetch(evento.request).then((respuestaRed) => {
        // Solo cachear respuestas válidas
        if (!respuestaRed || !respuestaRed.ok) return respuestaRed;

        const copiaParaCache = respuestaRed.clone();
        caches.open(NOMBRE_CACHE).then((cache) => {
          cache.put(evento.request, copiaParaCache);
        });

        return respuestaRed;
      }).catch(() => {
        // Sin red y sin caché: intentar servir el index principal
        console.warn('[SW] Sin conexion y recurso no cacheado:', evento.request.url);

        // Si el navegador pide una pagina HTML, devolver index principal como fallback
        const aceptaHTML = evento.request.headers.get('accept') || '';
        if (aceptaHTML.includes('text/html')) {
          return caches.match('/paginas/index.html');
        }
      });
    })
  );
});
