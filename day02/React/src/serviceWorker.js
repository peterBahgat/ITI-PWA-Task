/* eslint-disable no-restricted-globals */

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('counter-app-cache').then((cache) => {
      return cache.addAll(['/', '/index.html']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
