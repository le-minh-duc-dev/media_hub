import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostSearchParams } from "@/types/posts.types"

export default countPostList
async function countPostList(searchParams: PostSearchParams = {}) {
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

export  function countOnlyPublicPostList(searchParams: PostSearchParams = {}) {
  searchParams.isPrivate = false
  return countPostList(searchParams)
}

export  function countOnlyPrivatePostList(searchParams: PostSearchParams = {}) {
  searchParams.isPrivate = true
  return countPostList(searchParams)
}
