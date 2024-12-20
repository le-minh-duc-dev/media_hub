import { dbConnect } from "@/database/connect"
import Topic from "@/database/models/Topic"
import { TopicType } from "@/types/topics.types"
import mongoose from "mongoose"
import { revalidateTopicTags } from "./revalidateTopicTags"
export async function createTopic(
  { name, param, description, isPrivate, user }: TopicType,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  const newTopic = new Topic({
    name,
    param,
    description,
    isPrivate,
    user,
  })
  if (wantConnectDB) {
    await dbConnect()
  }
  await newTopic.save({ session })
  revalidateTopicTags()
  return newTopic
}
