"use server"

import { auth } from "@/authentication/auth"
import { protectUpdateContentPage } from "@/authentication/protect"
import { dbConnect } from "@/database/connect"
import { deleteMediaByURLs } from "@/services/media/mediaService"
import { updatePost as updatePostService } from "@/services/posts"
// import { createPost } from "@/services/posts"
import { PostType } from "@/types/posts.types"
import { MutatePostSchemaOnServer } from "@/zod/MutatePostSchema"
import mongoose from "mongoose"
import { after } from "next/server"
import slug from "slug"
import { sendNotifications } from "../notifications"

export async function updatePost(
  _id: string,
  post: PostType,
  deletedUrls: string[],
  uploadedUrls: string[]
) {
  await protectUpdateContentPage()

  const validationResult = MutatePostSchemaOnServer.safeParse(post)

  if (!validationResult.success) {
    return { success: false }
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
  let aborted = false
  await dbConnect()
  const DBsession = await mongoose.startSession()
  try {
    DBsession.startTransaction()
    //update current post
    await updatePostService(_id, newPost, false, DBsession)

    //delete images and videos deleted
    await deleteMediaByURLs(deletedUrls)
    await DBsession.commitTransaction()
    after(() => {
      sendNotifications(newPost.title, "Bài viết mới cập nhật")
    })
  } catch (error) {
    //rollback
    DBsession.abortTransaction()
    //delete images and videos uploaded
    await deleteMediaByURLs(uploadedUrls)
    aborted = true
    console.error(error)
  } finally {
    DBsession.endSession()
  }
  if (aborted)
    return {
      success: false,
    }
  return { success: true }
}
