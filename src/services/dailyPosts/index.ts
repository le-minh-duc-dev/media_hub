import { dbConnect } from "@/database/connect"
import DailyPost from "@/database/models/DailyPost"

async function createDailyPost(privatePostId: string, publicPostId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  await dbConnect()
  const dailyPost = await DailyPost.create({
    date: today,
    privatePost: privatePostId,
    publicPost: publicPostId,
  })
  await dailyPost.save()
}

async function getDailyPost(searchDate: Date) {
  await dbConnect()
  searchDate.setHours(0, 0, 0, 0)
  const dailyPost = await DailyPost.findOne({ date: searchDate })
  return dailyPost
}

export { getDailyPost, createDailyPost }
