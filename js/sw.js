self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-static').then(function(cache) {
      return cache.addAll(
        [
          '/',
          '/restaurant.html'
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
	event.respondWith(cache.match(event.request));
});