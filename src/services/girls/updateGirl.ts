import { dbConnect } from "@/database/connect"
import Girl from "@/database/models/Girl"
import { GirlType } from "@/types/girls.types"
import { revalidateTag } from "next/cache"
import { GET_GIRL_TAG } from "./getGirl"
import mongoose from "mongoose"

export async function updateGirl(
  _id: string,
  { name, param, description, topic, isPrivate, user, url }: GirlType,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const result = await Girl.updateOne(
    { _id },
    { name, param, description, topic, isPrivate, user, url },
    {
      session,
    }
  )
  revalidateTag(GET_GIRL_TAG)
  return result
}
