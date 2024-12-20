import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import mongoose from "mongoose"
import { revalidatePostTags } from "./revalidatePostTags"

export async function deletePost(
  param: string,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const result = await Post.deleteOne({ param }, { session })
  revalidatePostTags()
  return result
}
