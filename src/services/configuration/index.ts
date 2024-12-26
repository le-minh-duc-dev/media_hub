import Configuration from "@/database/models/Configuration"
import { CloudStorage } from "../media/cloudStorage"
import { dbConnect } from "@/database/connect"
import { unstable_cache } from "next/cache"
import mongoose from "mongoose"

export const GET_CONFIGURATION_TAG = "GET_CONFIGURATION_TAG"
export async function createConfiguration(
  userId: string,
  cloudStorage: CloudStorage = CloudStorage.default,
  session?: mongoose.mongo.ClientSession
) {
  if (!session) {
    await dbConnect()
  }
  const newConfiguration = new Configuration({ user: userId, cloudStorage })
  return await newConfiguration.save({ session })
}

export async function updateConfiguration(
  userId: string,
  cloudStorage: CloudStorage,
  session?: mongoose.mongo.ClientSession
) {
  if (!session) {
    await dbConnect()
  }
  return await Configuration.updateOne({ user: userId }, { cloudStorage })
}

export async function getConfiguration(userId: string) {
  return unstable_cache(
    async () => {
      await dbConnect()
      return await Configuration.findOne(
        { user: userId },
        { user: 1, cloudStorage: 1 }
      )
    },
    ["getConfiguration"],
    {
      tags: [GET_CONFIGURATION_TAG],
    }
  )()
}
