self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('lyrics-cache') // Tên cache
            .then(function (cache) {
                return cache.addAll([
                    '/', // Router cho phép chạy offline
                    '/offline', // Router cho phép chạy offline
                    '/index.html',
                    '/offline/index.html',
                    '/normal/index.html',
                    '/images/1.jpg',
                    '/images/2.jpg',
                    '/images/3.jpg',
                    '/images/4.jpg',
                    '/images/5.jpg',
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
