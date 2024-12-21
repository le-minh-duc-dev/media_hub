"use server"
import { protectUpdateContentPage } from "@/authentication/protect"
import { dbConnect } from "@/database/connect"
import { deleteMediaByURLs } from "@/services/media/mediaService"
import { deletePost as deletePostService, getPost } from "@/services/posts"
import { PostType } from "@/types/posts.types"
import mongoose from "mongoose"
import { redirect } from "next/navigation"

export async function deletePost(param: string) {
  await protectUpdateContentPage()

  let aborted = false
  await dbConnect()
  const DBsession = await mongoose.startSession()
  try {
    DBsession.startTransaction()
    const post: PostType = await getPost({ param }, true)
    //create postcreatePost
    const result = await deletePostService(param, false, DBsession)
    if (result.deletedCount > 0) {
      deleteMediaByURLs(post.body.map((bodyItem) => bodyItem.url))
    }
    //commit
    await DBsession.commitTransaction()
  } catch (error) {
    //rollback
    DBsession.abortTransaction()
    aborted = true
    console.error(error)
  } finally {
    DBsession.endSession()
  }
  if (aborted)
    return { message: "Có lỗi xảy ra! Không thể xóa bài viết ngay lúc này!" }
  return redirect("/admin/posts")
}
