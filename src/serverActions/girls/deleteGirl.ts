"use server"
import { protectUpdateContentPage } from "@/authentication/protect"
import { dbConnect } from "@/database/connect"
import { getGirl, deleteGirl as deleteGirlService } from "@/services/girls"
import { deleteMediaByURLs } from "@/services/media/mediaService"
import { checkPostExists } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
import mongoose from "mongoose"

export async function deleteGirl(param: string) {
  await protectUpdateContentPage()
  let aborted = false
  const girl: GirlType = await getGirl({ param }, true)
  const IsSomePostUsingThisGirl = await checkPostExists({
    girl: girl._id?.toString(),
  })
  if (IsSomePostUsingThisGirl) {
    return {success:false}
  }
  await dbConnect()
  const DBsession = await mongoose.startSession()
  try {
    DBsession.startTransaction()

    //create postcreatePost
    const result = await deleteGirlService(param, false, DBsession)
    if (result.deletedCount > 0) {
      deleteMediaByURLs([girl.url])
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
    return { success: false }
  return { success: true }
}
