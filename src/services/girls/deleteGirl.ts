import { dbConnect } from "@/database/connect"
import { revalidateTag } from "next/cache"
import mongoose from "mongoose"
import { GET_GIRL_TAG } from "./getGirl"
import Girl from "@/database/models/Girl"

export async function deleteGirl(
  param: string,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const result = await Girl.deleteOne({ param }, { session })
  revalidateTag(GET_GIRL_TAG)
  return result
}
