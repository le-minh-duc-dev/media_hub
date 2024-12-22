self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || "/assets/images/logo.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        url:data.url,
        dateOfArrival: Date.now(),
        primaryKey: data.primarykey?data.primaryKey:1,
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.")
  const url = event.notification.data?.url
  event.notification.close()
  event.waitUntil(clients.openWindow(url ? url : "https://girlxinh.fun"))
})
