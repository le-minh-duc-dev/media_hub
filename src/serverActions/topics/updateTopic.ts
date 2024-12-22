"use server"
import { auth } from "@/authentication/auth"
import { protectUpdateContentPage } from "@/authentication/protect"
import { dbConnect } from "@/database/connect"
import { updateTopic as updateTopicService } from "@/services/topics"
import { TopicType } from "@/types/topics.types"
import { MutateTopicSchema } from "@/zod/MutateTopicSchema"

import mongoose from "mongoose"
import slug from "slug"

export async function updateTopic(_id: string, topic: TopicType) {
  await protectUpdateContentPage()

  const validationResult = MutateTopicSchema.safeParse(topic)

  if (!validationResult.success) {
    return { success: false }
  }
  const session = await auth()
  const user = session!.user
  const safeTopic = validationResult.data
  //create param
  const param = slug(safeTopic.name)
  const newTopic: TopicType = {
    user: user.id!,
    name: safeTopic.name,
    param,
    description: safeTopic.description,
    isPrivate: safeTopic.isPrivate,
  }
  let aborted = false
  await dbConnect()
  const DBsession = await mongoose.startSession()
  try {
    DBsession.startTransaction()
    //update current Topic
    await updateTopicService(_id, newTopic, false, DBsession)
    await DBsession.commitTransaction()
    console.log("transaction committed!")
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
