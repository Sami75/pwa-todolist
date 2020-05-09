// Listen for install event, set callback
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("todos-cache-v1").then(function (cache) {
      return cache.addAll([
        "/styles/styles.css",
        "/js/api/todos.js",
        "/",
        // etc
      ]);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(clients.claim());
});

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.open('todos-cache-v1').then(function(cache) {
//         return cache.match(event.request).then(function (response) {
//           return response || fetch(event.request).then(function(response) {
//             cache.put(event.request, response.clone());
//             return response;
//           });
//         });
//       })
//     );
//   });
