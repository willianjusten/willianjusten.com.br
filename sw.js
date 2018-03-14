---
layout: null
---

const staticCacheName = 'willian-justen-{{ site.time | date: "%Y-%m-%d-%H-%M" }}';

const filesToCache = [
  "/",
  {% for page in site.pages_to_cache %}
    '{{ page }}',
  {% endfor %}
  {% for post in site.posts limit: 6%}
    '{{ post.url }}',
  {% endfor %}
  {% for asset in site.files_to_cache %}
    '{{ asset }}',
  {% endfor %}
];

self.addEventListener("install", function(e){
  self.skipWaiting();

  e.waitUntil(
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll(filesToCache);
    })
  )
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith("willian-justen-")
            && cacheName != staticCacheName;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      )
    })
  )
});

self.addEventListener("fetch", function(e){
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  )
});
