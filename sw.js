const CACHE_NAME = 'lbalp-cache-v1';

// Recursos críticos para la funcionalidad offline
const urlsToCache = [
  '/',
  '/index.html',
  '/paginas/index.html',
  '/paginas/justificacion.html',
  '/paginas/index2.html',
  '/paginas/index3.html',
  '/paginas/nosotros.html',
  '/estilos/tailwind-compilado.css',
  '/estilos/fuentes-locales.css',
  '/estilos/estilos-base.css',
  '/scripts/menu-movil.js',
  '/scripts/logica-tema.js',
  '/activos/imagenes/institucion-abstracta.svg',
  '/activos/imagenes/aula-abstracto.svg',
  '/activos/imagenes/estudiante-abstracto.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierto con éxito.');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna desde caché si existe, sino busca en la red de forma transparente
        return response || fetch(event.request).then(fetchRes => {
            // Podríamos cachear dinámicamente aquí, pero para este manual estático,
            // dejaremos que busque en red si no está en la caché inicial.
            return fetchRes;
        });
      }).catch(() => {
          // Si falla la red y no está en caché, idealmente enviar a una página offline
          // Como es una SPA/sitio estático, la mayoría estará en caché.
      })
  );
});

// Limpiar cachés antiguas
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
