const CACHE_NAME = 'lbalp-cache-v3';

// Recursos críticos para la funcionalidad offline inicial
const urlsToCache = [
  '/',
  '/index.html',
  '/paginas/index.html',
  '/paginas/justificacion.html',
  '/paginas/index2.html',
  '/paginas/index3.html',
  '/paginas/nosotros.html',
  '/estilos/fuentes-locales.css',
  '/estilos/estilos-base.css',
  '/estilos/componentes-comunes.css',
  '/estilos/main.css',
  '/estilos/utilidades-espanol.css',
  '/scripts/menu-movil.js',
  '/scripts/logica-tema.js',
  '/scripts/app.js',
  '/activos/iconos/icono.svg'
];

// 1. Fase de Instalación: Guardar recursos críticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierto y cargando recursos esenciales.');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Fase de Activación: Limpiar cachés antiguas inmediatamente
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fase de Intercepción (Fetch): Estrategia Stale-While-Revalidate / Cache Dynamic
self.addEventListener('fetch', event => {
  // Ignorar peticiones que no sean GET (como extensiones del navegador, etc.)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Si el recurso está en caché, lo devolvemos de inmediato
      if (cachedResponse) {
        // Opcional: Actualizamos la caché en segundo plano si hay red
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {/* Red no disponible, ignorar en segundo plano */});

        return cachedResponse;
      }

      // Si no está en caché, lo buscamos en la red y lo guardamos dinámicamente
      return fetch(event.request)
        .then(networkResponse => {
          // Validar si la respuesta es correcta
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
            return networkResponse;
          }

          // Clonar la respuesta ya que el stream solo se puede leer una vez
          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Si falla la red y no está en caché, puedes retornar una página de respaldo o sub-recurso si aplica.
          console.fal('Fallo de red y recurso no cacheado:', event.request.url);
        });
    })
  );
});