import { dbConnect } from "@/database/connect"
import mongoose from "mongoose"
import Girl from "@/database/models/Girl"
import { revalidateGirlTags } from "./revalidateGirlTags"

export async function deleteGirl(
  param: string,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const result = await Girl.deleteOne({ param }, { session })
  revalidateGirlTags()
  return result
}
