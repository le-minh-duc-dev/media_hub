"use server"

import { auth } from "@/authentication/auth"
import { protectUpdateContentPage } from "@/authentication/protect"
import { dbConnect } from "@/database/connect"
import { createTopic as createTopicService } from "@/services/topics"
import { TopicType } from "@/types/topics.types"
import { MutateTopicSchema } from "@/zod/MutateTopicSchema"

import mongoose from "mongoose"
import slug from "slug"

export async function createTopic(Topic: TopicType) {
  await protectUpdateContentPage()
  const validationResult = MutateTopicSchema.safeParse(Topic)
  if (!validationResult.success) {
    return { success:false }
  }
  const session = await auth()
  const user = session!.user
  const safeTopic = validationResult.data
  //create param
  const param = slug(safeTopic.name)
  const newTopic: TopicType = {
    user: user.id!,
    param,
    name: safeTopic.name,
    description: safeTopic.description,
    isPrivate: safeTopic.isPrivate,
  }
  let aborted = false
  await dbConnect()
  const DBsession = await mongoose.startSession()
  try {
    DBsession.startTransaction()
    //create post
    await createTopicService(newTopic, false, DBsession)
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
