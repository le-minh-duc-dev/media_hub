import { dbConnect } from "@/database/connect"
import Topic from "@/database/models/Topic"
import { revalidateTag } from "next/cache"

import mongoose from "mongoose"
import { GET_TOPIC_TAG } from "./getTopic"

export async function deleteTopic(
  param: string,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const result = await Topic.deleteOne({ param }, { session })
  revalidateTag(GET_TOPIC_TAG)
  return result
}
