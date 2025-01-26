// Name of the cache
const CACHE_NAME = "WDOS-Assignment-cache-v1";

// List of assets to cache
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/favicon.ico",
  "/images/logo.png",
  "/images/game1.jpg",
  "/images/game2.jpg"
];

// Install event: Cache files
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching all assets");
      return cache.addAll(ASSETS);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached files if available
self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Serve cached file or fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});