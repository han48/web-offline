self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('lyrics-cache') // Tên cache
            .then(function (cache) {
                return cache.addAll([
                    '/web-offline', // Router cho phép chạy offline
                    '/web-offline/offline', // Router cho phép chạy offline
                    '/web-offline/index.html',
                    '/web-offline/offline/index.html',
                    '/web-offline/normal/index.html',
                    '/web-offline/images/1.jpg',
                    '/web-offline/images/2.jpg',
                    '/web-offline/images/3.jpg',
                    '/web-offline/images/4.jpg',
                    '/web-offline/images/5.jpg',
                ]);
            })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['lyrics-cache'];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
    );
});
