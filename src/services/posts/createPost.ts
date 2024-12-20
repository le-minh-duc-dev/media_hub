import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostType } from "@/types/posts.types"
import mongoose from "mongoose"
import { revalidatePostTags } from "./revalidatePostTags"

export async function createPost(
  { title, param, description, girl, isPrivate, user, view, body }: PostType,
  wantConnectDB: boolean = true, session?: mongoose.mongo.ClientSession 
) {
  const newPost = new Post({
    title,
    param,
    description,
    girl,
    isPrivate,
    user,
    view,
    body,
  })
  if (wantConnectDB) {
    await dbConnect()
  }
  await newPost.save({session})
  revalidatePostTags()
  return newPost
}
