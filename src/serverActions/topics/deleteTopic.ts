"use server"
import { protectUpdateContentPage } from "@/authentication/protect"
import { dbConnect } from "@/database/connect"
import { getTopic, deleteTopic as deleteTopicService } from "@/services/topics"
import { checkGirlExists } from "@/services/girls"
import { TopicType } from "@/types/topics.types"
import mongoose from "mongoose"

export async function deleteTopic(param: string) {
  await protectUpdateContentPage()
  let aborted = false
  const topic: TopicType = await getTopic({ param }, true)
  const IsSomeGirlUsingThisTopic = await checkGirlExists({
    topic: topic._id?.toString(),
  })
  if (IsSomeGirlUsingThisTopic) {
    return { success: false }
  }
  await dbConnect()
  const DBsession = await mongoose.startSession()
  try {
    DBsession.startTransaction()

    //create postcreatePost
    await deleteTopicService(param, false, DBsession)
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
  if (aborted) return { success: false }
  return { success: true }
}
