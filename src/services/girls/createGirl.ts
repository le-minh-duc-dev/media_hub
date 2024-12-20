import { dbConnect } from "@/database/connect"
import mongoose from "mongoose"
import { GirlType } from "@/types/girls.types"
import Girl from "@/database/models/Girl"
import { revalidateGirlTags } from "./revalidateGirlTags"

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
  revalidateGirlTags()
  return newGirl
}
