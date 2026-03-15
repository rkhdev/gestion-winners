// Service Worker minimal - pas de cache agressif
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Ne pas intercepter les requêtes API Supabase
  if (e.request.url.includes('supabase.co')) return;
  // Laisser passer toutes les autres requêtes normalement
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
