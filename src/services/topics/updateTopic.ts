import { dbConnect } from "@/database/connect"
import Topic from "@/database/models/Topic"
import { TopicType } from "@/types/topics.types"
import mongoose from "mongoose"
import { revalidateTopicTags } from "./revalidateTopicTags"

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
  revalidateTopicTags()

  return result
}
