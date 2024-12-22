"use server"

import { createSubscription } from "@/services/Subscription"
import { PushSubscription } from "web-push"

export async function subscribeUser(sub: PushSubscription) {
  await createSubscription(sub)
}
