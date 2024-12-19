import { dbConnect } from "@/database/connect"
import Topic from "@/database/models/Topic"
import { TopicType } from "@/types/topics.types"
import { revalidateTag } from "next/cache"
import mongoose from "mongoose"
import { GET_TOPIC_TAG } from "./getTopic"
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
  revalidateTag(GET_TOPIC_TAG)
  return newTopic
}
