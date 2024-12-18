"use server"

import { auth } from "@/authentication/auth"
import { protectUpdateContentPage } from "@/authentication/protect"
import { createPost } from "@/services/posts"
// import { createPost } from "@/services/posts"
import { PostType } from "@/types/posts.types"
import { EditPostSchemaOnServer } from "@/zod/EditPostSchema"
import slug from "slug"

export async function createPosts(post: PostType) {
  await protectUpdateContentPage()
  const validationResult = EditPostSchemaOnServer.safeParse(post)
  if (!validationResult.success) {
    return { message: "Invalid data" }
  }
  const session = await auth()
  const user = session!.user
  const safePost = validationResult.data
  //create param
  const param = slug(safePost.title)
  const newPost: PostType = {
    user: user.id!,
    title: safePost.title,
    param,
    description: safePost.description,
    girl: safePost.girl,
    isPrivate: safePost.isPrivate,
    body: safePost.body,
    view: safePost.view,
  }
  await createPost(newPost)
  return { message: "success" }
}
