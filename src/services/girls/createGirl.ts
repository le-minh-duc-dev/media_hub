import { dbConnect } from "@/database/connect"
import { revalidateTag } from "next/cache"

import mongoose from "mongoose"
import { GET_GIRL_TAG } from "./getGirl"
import { GirlType } from "@/types/girls.types"
import Girl from "@/database/models/Girl"

export async function createGirl(
  { name, param, description, topic, isPrivate, user, url }: GirlType,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  const newGirl = new Girl({
    name,
    param,
    description,
    topic,
    isPrivate,
    user,
    url,
  })
  if (wantConnectDB) {
    await dbConnect()
  }
  await newGirl.save({ session })
  revalidateTag(GET_GIRL_TAG)
  return newGirl
}
