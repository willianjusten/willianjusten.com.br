---
layout: null
---

var urlsToCache = [];

// Cache posts
{% for post in site.posts limit: 6 %}
  urlsToCache.push("{{ post.url }}")
{% endfor %}

// Cache pages
{% for page in site.pages_to_cache %}
  urlsToCache.push("{{ page }}")
{% endfor %}

// Cache assets
{% for asset in site.files_to_cache %}
  urlsToCache.push("{{ asset }}")
{% endfor %}

var CACHE_NAME = 'willian-justen-{{ site.time }}';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return fetch(event.request).then(function (response) {
                cache.put(event.request, response.clone());
                return response;
            });
        })
    );
});
