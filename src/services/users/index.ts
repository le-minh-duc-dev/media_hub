import { dbConnect } from "@/database/connect"
import User from "@/database/models/User"
import mongoose from "mongoose"
// import bcrypt from "bcryptjs"
import { unstable_cache } from "next/cache"

export const GET_USER_TAG = "GET_USER_TAG"
export async function getUserById(id: string) {
  return unstable_cache(
    async (id: string) => {
      await dbConnect()
      return await User.findOne({ _id: id })
    },
    [],
    { tags: [GET_USER_TAG] }
  )(id)
}

export async function getUserByEmail(email: string) {
  return unstable_cache(
    async (email: string) => {
      await dbConnect()
      return await User.findOne({ email })
    },
    [],
    { tags: [GET_USER_TAG] }
  )(email)
}

export async function createUser(
  name: string,
  email: string,
  // password: string,
  url?: string,
  session?: mongoose.mongo.ClientSession
) {
  await dbConnect()
  // const salt = 10
  // const hashedPassword = await bcrypt.hash(password, salt)
  const user = new User({ name, email, url })
  return await user.save({ session })
}
