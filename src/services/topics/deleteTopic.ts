import { dbConnect } from "@/database/connect"
import Topic from "@/database/models/Topic"

import mongoose from "mongoose"
import { revalidateTopicTags } from "./revalidateTopicTags"

export async function deleteTopic(
  param: string,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const result = await Topic.deleteOne({ param }, { session })
  revalidateTopicTags()
  return result
}
