// Empty service worker placeholder to prevent browser cache 500 errors on localhost
self.addEventListener('install', () => {
  self.skipWaiting();
});
self.addEventListener('activate', () => {
  self.clients.claim();
});
