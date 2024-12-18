import { dbConnect } from "@/database/connect"
import DailyPost from "@/database/models/DailyPost"
import { unstable_cache } from "next/cache"

export const GET_DAILY_POST = "GET_DAILY_POST"
export type CreateDailyPostType = {date?:string,privatePostId: string, publicPostId: string}
async function createDailyPost({date,privatePostId, publicPostId}:CreateDailyPostType) {
 
  await dbConnect()
  const dailyPost = await DailyPost.create({
    date,
    privatePost: privatePostId,
    publicPost: publicPostId,
  })
  await dailyPost.save()
}

function getDailyPost({
  UTCDate,
  UTCMonth,
  UTCYear,
}: {
  UTCDate: number
  UTCMonth: number
  UTCYear: number
}) {
  return unstable_cache(getDailyPostNoCache, [], {
    tags: [GET_DAILY_POST],
  })({
    UTCDate,
    UTCMonth,
    UTCYear,
  })
}
async function getDailyPostNoCache({
  UTCDate,
  UTCMonth,
  UTCYear,
}: {
  UTCDate: number
  UTCMonth: number
  UTCYear: number
}) {
  await dbConnect()

  const dailyPost = await DailyPost.findOne({
    date: `${UTCYear}-${UTCMonth}-${UTCDate}`,
  })
  return dailyPost
}

export { getDailyPost, createDailyPost }
