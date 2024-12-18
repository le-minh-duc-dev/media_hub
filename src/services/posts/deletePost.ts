import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { revalidateTag } from "next/cache"
import { GET_POST_TAG } from "./getPost"
import mongoose from "mongoose"

export async function deletePost(
  param: string,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const result = await Post.deleteOne({ param }, { session })
  revalidateTag(GET_POST_TAG)
  return result
}
