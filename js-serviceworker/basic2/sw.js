var CACHE_NAME = 'my-cache-v4';
var CACHE_DATA_NAME = 'my-cache-data-v1';
var urlsToCache = [
    '../../assets/HTML5_Badge.png',
    './main.css',
    './main.js'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(urlsToCache);
        }).then(function () {
            console.log('[serviceWorker]: Intalled And Skip Waiting on Install');
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    var dataUrl = 'data.json';
    if (e.request.url.indexOf(dataUrl) > -1) {
        e.respondWith(
            caches.open(CACHE_DATA_NAME).then(function(cache) {
                return fetch(e.request).then(function(response){
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request);
            })
        );
    }
});

