import { dbConnect } from "@/database/connect"
import User from "@/database/models/User"
import bcrypt from "bcryptjs"
async function getUserById(id: string) {
  await dbConnect()
  return await User.findOne({ _id: id })
}
async function getUserByEmail(email: string) {
  await dbConnect()
  return await User.findOne({ email })
}

async function createUser(name: string, email: string, password: string) {
  await dbConnect()
  const salt = 10
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = new User({ name, email, password: hashedPassword })
  return await user.save()
}

export { getUserByEmail, createUser, getUserById }
