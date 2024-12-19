"use server"
import { auth } from "@/authentication/auth"
import { protectUpdateContentPage } from "@/authentication/protect"
import { dbConnect } from "@/database/connect"
import { deleteMediaByURLs } from "@/services/media/mediaService"
import { updateGirl as updateGirlService } from "@/services/girls"
import { GirlType } from "@/types/girls.types"
import { MutateGirlSchemaOnServer } from "@/zod/MutateGirlSchema"
import mongoose from "mongoose"
import slug from "slug"

export async function updateGirl(
  _id: string,
  girl: GirlType,
  deletedUrl: string
) {
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
    name: safeGirl.name,
    param,
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
    //update current Girl
    await updateGirlService(_id, newGirl, false, DBsession)

    //delete images and videos deleted
    await deleteMediaByURLs([deletedUrl])
    await DBsession.commitTransaction()
    console.log("transaction committed!")
  } catch (error) {
    //rollback
    DBsession.abortTransaction()
    //delete images and videos uploaded
    await deleteMediaByURLs([safeGirl.url])
    aborted = true
    console.error(error)
  } finally {
    DBsession.endSession()
  }
  if (aborted)
    return {
      message: "Có lỗi xảy ra! Không thể cập nhật girl xinh ngay lúc này!",
    }
  return { message: "Cập nhật girl xinh thành công" }
}
