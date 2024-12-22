import { dbConnect } from "@/database/connect"
import { Subscription } from "@/database/models/Subscription"
import mongoose from "mongoose"
import { GET_SUBSCRIPTION_TAG, getSubscription } from "./getSubcription"
import { PushSubscription } from "web-push"
import { revalidateTag } from "next/cache"

export async function createSubscription(
  sub: PushSubscription,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const existingSub = await getSubscription({ endpoint: sub.endpoint }, true)
  if (!existingSub) {
    const newSub = new Subscription(sub)
    await newSub.save({ session })
    revalidateTag(GET_SUBSCRIPTION_TAG)
  }

  return true
}
