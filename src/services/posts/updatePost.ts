import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostType } from "@/types/posts.types"
import { revalidateTag } from "next/cache"
import { GET_POST_TAG } from "./getPost"
import mongoose from "mongoose"

export async function updatePost({
  _id,
  title,
  param,
  description,
  girl,
  isPrivate,
  user,
  view,
  body,
}: PostType) {
  await dbConnect()
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const result = await Post.updateOne(
      { _id },
      {
        title,
        param,
        description,
        girl,
        isPrivate,
        user,
        view,
        body,
      },
      { session }
    )
    await session.commitTransaction()
    revalidateTag(GET_POST_TAG)
    return result
  } catch (error) {
    session.abortTransaction()

    throw error
  } finally {
    session.endSession()
  }
}
