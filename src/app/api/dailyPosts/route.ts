import {
  createDailyPost as create,
  CreateDailyPostType,
  GET_DAILY_POST,
  getDailyPost,
} from "@/services/dailyPosts"
import { getRandomPosts } from "@/services/posts"
import { DailyPost } from "@/types/dailyPosts.types"
import { revalidateTag } from "next/cache"



export async function GET() {
  try {
    const today = new Date()
    const searchDate = {
      UTCDate: today.getUTCDate(),
      UTCMonth: today.getUTCMonth(),
      UTCYear: today.getUTCFullYear(),
    }
    const dailyPost: DailyPost | null = await getDailyPost(searchDate)
    if (!dailyPost) {
      const publicPosts = await getRandomPosts({ isPrivate: false })
      const privatePosts = await getRandomPosts({})
      const publicPost = publicPosts[0] || null
      const privatePost = privatePosts[0] || null

      await createDailyPost({
        privatePostId: privatePost?._id,
        publicPostId: publicPost?._id,
      })
    }
    return Response.json({ message: "successfully!" })
  } catch (error) {
    console.error("Error in daily post creation:", error)
    return Response.json(
      { error: "Failed to create daily post" },
      { status: 500 }
    )
  }
}

async function createDailyPost({
  privatePostId,
  publicPostId,
}: CreateDailyPostType) {
  const today = new Date()
  const UTCDate = today.getUTCDate()
  const UTCMonth = today.getUTCMonth()
  const UTCYear = today.getUTCFullYear()
  await create({
    date: `${UTCYear}-${UTCMonth}-${UTCDate}`,
    privatePostId,
    publicPostId,
  })
  revalidateTag(GET_DAILY_POST)
}
