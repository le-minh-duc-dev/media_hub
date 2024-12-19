"use server"

import { auth } from "@/authentication/auth"
import { protectUpdateContentPage } from "@/authentication/protect"
import { dbConnect } from "@/database/connect"
import { deleteMediaByURLs } from "@/services/media/mediaService"
import { createGirl as createGirlService } from "@/services/girls"
import { GirlType } from "@/types/girls.types"
import { MutateGirlSchemaOnServer } from "@/zod/MutateGirlSchema"
import mongoose from "mongoose"
import slug from "slug"

export async function createGirl(girl: GirlType) {
  await protectUpdateContentPage()
  const validationResult = MutateGirlSchemaOnServer.safeParse(girl)
  if (!validationResult.success) {
    return { message: "Invalid data" }
  }
  const session = await auth()
  const user = session!.user
  const safeGirl = validationResult.data
  //create param
  const param = slug(safeGirl.name)
  const newGirl: GirlType = {
    user: user.id!,
    param,
    name: safeGirl.name,
    description: safeGirl.description,
    topic: safeGirl.topic,
    isPrivate: safeGirl.isPrivate,
    url: safeGirl.url,
  }
  let aborted = false
  await dbConnect()
  const DBsession = await mongoose.startSession()
  try {
    DBsession.startTransaction()
    //create post
    await createGirlService(newGirl, false, DBsession)
    //commit
    await DBsession.commitTransaction()
  } catch (error) {
    //rollback
    DBsession.abortTransaction()
    //delete uploaded image
    deleteMediaByURLs([safeGirl.url])
    aborted = true
    console.error(error)
  } finally {
    DBsession.endSession()
  }
  if (aborted)
    return { message: "Có lỗi xảy ra! Không thể tạo girl xinh ngay lúc này!" }
  return { message: "Tạo girl xinh thành công" }
}
