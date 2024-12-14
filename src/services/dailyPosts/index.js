import { dbConnect } from "database/connect"
import DailyPost from "database/models/dailyPost"
import { unstable_cache } from "next/cache"

async function createDailyPost(privatePostId, publicPostId) {
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

async function getDailyPostNoCache(searchDate) {
  await dbConnect()
  searchDate.setHours(0, 0, 0, 0)
  const dailyPost = await DailyPost.findOne({ date: searchDate })
  return dailyPost
}

const getDailyPost = unstable_cache(getDailyPostNoCache, ["dailyPost"], {
  tags: ["dailyPost"],
})

export {getDailyPost,createDailyPost}