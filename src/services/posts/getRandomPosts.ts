import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostSearchParams } from "@/types/posts.types"

async function getRandomPosts(searchParams: PostSearchParams = {}, size = 1) {
  //connect to database
  await dbConnect()
  const { girl, isPrivate, search } = searchParams

  let query: Record<string, unknown> = {}

  if (girl) query.girl = girl
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { $text: { $search: search } }

  const posts = await Post.aggregate([
    { $match: query }, // Filter criteria
    { $sample: { size } }, // Random selection
  ])
  return posts
}
export default getRandomPosts
