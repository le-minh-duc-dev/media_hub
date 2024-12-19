import { dbConnect } from "@/database/connect"
import Topic from "@/database/models/Topic"
import { TopicType } from "@/types/topics.types"
import { revalidateTag } from "next/cache"
import mongoose from "mongoose"
import { GET_TOPIC_TAG } from "./getTopic"

export async function updateTopic(
  _id: string,
  { name, param, description, isPrivate, user }: TopicType,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const result = await Topic.updateOne(
    { _id },
    { name, param, description, isPrivate, user },
    {
      session,
    }
  )
  revalidateTag(GET_TOPIC_TAG)
  return result
}
