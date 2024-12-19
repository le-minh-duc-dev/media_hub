"use server"

import { auth } from "@/authentication/auth"
import { protectUpdateContentPage } from "@/authentication/protect"
import { dbConnect } from "@/database/connect"
import { deleteMediaByURLs } from "@/services/media/mediaService"
import { createPost as createPostService } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
// import { createPost } from "@/services/posts"
import { PostType } from "@/types/posts.types"
import { MutatePostSchemaOnServer } from "@/zod/MutatePostSchema"
import mongoose from "mongoose"
import slug from "slug"

export async function createGirl(girl: GirlType) {
  await protectUpdateContentPage()
  const validationResult = MutatePostSchemaOnServer.safeParse(post)
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
  let aborted = false
  await dbConnect()
  const DBsession = await mongoose.startSession()
  try {
    DBsession.startTransaction()
    //create post
    await createPostService(newPost,false,DBsession)
    //commit
    await DBsession.commitTransaction()
  } catch (error) {
    //rollback
    DBsession.abortTransaction()
    //delete uploaded images and videos
    deleteMediaByURLs(newPost.body.map((bodyItem) => bodyItem.url))
    aborted = true
    console.error(error)
  } finally {
    DBsession.endSession()
  }
  if (aborted) return { message: "Có lỗi xảy ra! Không thể tạo bài viết ngay lúc này!" }
  return { message: "Tạo bài viết thành công" }
}
