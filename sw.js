// Minimal service worker for PWA installation
// Keeps your local-first philosophy intact

const CACHE_NAME = 'attendance-scanner-v1';

// Install event - minimal setup
self.addEventListener('install', event => {
  console.log('Service Worker installing');
  self.skipWaiting(); // Activate immediately
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim()); // Take control immediately
});

// Fetch event - pass through all requests (no aggressive caching)
self.addEventListener('fetch', event => {
  // For local-first apps, we generally just pass through
  // This allows your app to work offline once installed
  event.respondWith(fetch(event.request).catch(() => {
    // If network fails, could return cached version here if desired
    // For now, just let it fail gracefully
    return new Response('Offline - please try again when connected', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }));
});
