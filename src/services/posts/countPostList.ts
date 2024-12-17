import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostSearchParams } from "@/types/posts.types"
import { unstable_cache } from "next/cache"

export const COUNT_POST_LIST_TAG = "COUNT_POST_LIST_TAG"
export function countPostList(searchParams: PostSearchParams = {}) {
  return unstable_cache(countNoCachePostList, [], {
    tags: [COUNT_POST_LIST_TAG],
  })(searchParams)
}
async function countNoCachePostList(searchParams: PostSearchParams = {}) {
  //connect to database
  await dbConnect()
  const { girl, isPrivate, search } = searchParams

  let query: Record<string, unknown> = {}

  if (girl) query.girl = girl
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { $text: { $search: search } }

  const count = await Post.countDocuments(query)
  return count
}

export function countOnlyPublicPostList(searchParams: PostSearchParams = {}) {
  searchParams.isPrivate = false
  return countPostList(searchParams)
}

export function countOnlyPrivatePostList(searchParams: PostSearchParams = {}) {
  searchParams.isPrivate = true
  return countPostList(searchParams)
}
