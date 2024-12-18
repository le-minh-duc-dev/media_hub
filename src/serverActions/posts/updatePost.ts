"use server"

import { auth } from "@/authentication/auth"
import { protectUpdateContentPage } from "@/authentication/protect"
import { createPost } from "@/services/posts"
// import { createPost } from "@/services/posts"
import { PostType } from "@/types/posts.types"
import {
  DeletedUrlsSchema,
  MutatePostSchemaOnServer,
} from "@/zod/MutatePostSchema"
import slug from "slug"

export async function updatePost(post: PostType, deletedUrls: string[]) {
  await protectUpdateContentPage()
  const validationResult = MutatePostSchemaOnServer.safeParse(post)
  const deletedUrlsValidationResult = DeletedUrlsSchema.safeParse(deletedUrls)
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
  try {
   
    await createPost(newPost)
  } catch (error) {}

  return { message: "success" }
}
