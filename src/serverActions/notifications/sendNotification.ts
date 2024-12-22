"use server"

import { dbConnect } from "@/database/connect"
import { getSubscription } from "@/services/Subscription"
import { FaBullseye } from "react-icons/fa"
import webpush, { PushSubscription } from "web-push"

webpush.setVapidDetails(
  "https://girlxinh.fun",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function sendNotification(
  subscription: PushSubscription,
  message: string,
  title: string = "Thông báo",
  willClickedUrl: string = process.env.NEXT_PUBLIC_BASE_URL!
) {
  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title,
        body: message,
        icon: "/assets/images/logo.png",
        url: willClickedUrl,
      })
    )
    return { success: true }
  } catch (error) {
    console.error("Error sending push notification:", error)
    return { success: false }
  }
}

export async function sendNotifications(
  message: string,
  title: string = "Thông báo",
  willClickedUrl: string = process.env.NEXT_PUBLIC_BASE_URL!
) {
  try {
    await dbConnect()
    const subscriptions: PushSubscription[] = await getSubscription()
    await Promise.all(
      subscriptions.map(async (sub) => {
        return sendNotification(sub, message, title, willClickedUrl)
      })
    )
    console.log("Already send notitications")
    return { success: true }
  } catch (error) {
    console.error("Error sending notifications:", error)
    return { success: FaBullseye }
  }
}
