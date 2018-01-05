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
	event.respondWith(
    cache.match(event.request).then(function(response) {
      return response? response:fetch(event.request).then(function(res) {
        return res.status == 404? new Response('404, not found'): res;
      })
      .catch(function() {
        return new Response('site failed to load');
      })
    })
  );
});