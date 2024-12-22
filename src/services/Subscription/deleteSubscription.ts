import { dbConnect } from "@/database/connect"
import { Subscription } from "@/database/models/Subscription"
import mongoose from "mongoose"

export async function deleteSubscription(
  endpoint: string,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  await Subscription.findOneAndDelete({ endpoint }, { session })
}
