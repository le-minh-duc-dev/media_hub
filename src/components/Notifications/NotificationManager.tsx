"use client"

import {  useEffect } from "react"
import {
  subscribeUser,
} from "@/serverActions/notifications"

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function NotificationManager() {
  useEffect(() => {
    async function registerServiceWorker() {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      })
      const sub = await registration.pushManager.getSubscription()
      console.log("sub",sub);
      if (!sub) {
        subscribeToPush()
      }
    }
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker()
    }
  }, [])

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  // async function unsubscribeFromPush() {
  //   await subscription?.unsubscribe()
  //   setSubscription(null)
  //   await unsubscribeUser()
  // }

  // async function sendTestNotification() {
  //   if (subscription) {
  //     await sendNotification(message)
  //     setMessage("")
  //   }
  // }

  return <></>
}
