import { dbConnect } from "@/database/connect"
import DailyPost from "@/database/models/DailyPost"
import { unstable_cache } from "next/cache"

export const GET_DAILY_POST = "GET_DAILY_POST"

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

function getDailyPost({
  date,
  month,
  year,
}: {
  date: number
  month: number
  year: number
}) {
  return unstable_cache(getDailyPostNoCache, [], { tags: [GET_DAILY_POST] })({
    date,
    month,
    year,
  })
}
async function getDailyPostNoCache({
  date,
  month,
  year,
}: {
  date: number
  month: number
  year: number
}) {
  await dbConnect()
  const searchDate = new Date(year, month, date)
  searchDate.setHours(0, 0, 0, 0)
  const dailyPost = await DailyPost.findOne({ date: searchDate })
  return dailyPost
}

export { getDailyPost, createDailyPost }
