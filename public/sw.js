const CACHE_NAME = "cloudinary-image-cache-v2"

self.addEventListener("install", () => {
  console.log("Service Worker installing...")
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...")
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`Deleting old cache: ${cacheName}`)
            return caches.delete(cacheName)
          }
        })
      )
    )
  )

  return self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url)

  const isCloudinaryImage =
    requestUrl.hostname === "res.cloudinary.com" &&
    /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(requestUrl.pathname)

  const isLocalStaticImage =
    requestUrl.origin === self.location.origin &&
    /^\/assets\/images\/.*\.(jpg|jpeg|png|gif|svg|webp)$/i.test(requestUrl.pathname)

  if (isCloudinaryImage || isLocalStaticImage) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log(`Serving cached image: ${requestUrl.href}`)
          return cachedResponse
        }

        return fetch(event.request)
          .then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone())
              console.log(`Caching new image: ${requestUrl.href}`)
              return networkResponse
            })
          })
          .catch((err) => {
            console.warn(`Fetch failed for ${requestUrl.href}`, err)
            return new Response("Image unavailable", { status: 503 })
          })
      })
    )
  }
})

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("Skip waiting received, activating new Service Worker.")
    self.skipWaiting()
  }
})

self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || "/assets/images/logo.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        url: data.url,
        dateOfArrival: Date.now(),
        primaryKey: data.primarykey ? data.primaryKey : 1,
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.")
  const url = event.notification.data?.url
  event.notification.close()
  event.waitUntil(clients.openWindow(url ? url : process.env.NEXT_PUBLIC_BASE_URL))
})
