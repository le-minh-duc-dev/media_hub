import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostType } from "@/types/posts.types"
import { revalidateTag } from "next/cache"
import { GET_POST_TAG } from "./getPost"

export async function createPost({
  title,
  param,
  description,
  girl,
  isPrivate,
  user,
  view,
  body,
}: PostType) {
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
  await dbConnect()
  await newPost.save()
  revalidateTag(GET_POST_TAG)
  return newPost
}
