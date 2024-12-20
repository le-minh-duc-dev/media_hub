import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostSearchParams } from "@/types/posts.types"
import mongoose, { PipelineStage } from "mongoose"
import { unstable_cache } from "next/cache"

export const GET_POST_TAG = "posts"

const DEFAULT_LIMIT = 1000
const DEFAULT_PAGE = 1
const DEFAULT_SORT = -1 // Ascending

export function getPost(
  searchParams: PostSearchParams = {},
  isFindOne = false
) {
  return unstable_cache(getNoCachePost, [], {
    tags: [GET_POST_TAG],
  })(searchParams, isFindOne)
}

export async function getNoCachePost(
  {
    param,
    girl,
    isPrivate,
    search,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    sort_created,
    sort_updated,
    sort_level,
    sort_views,
  }: PostSearchParams = {},
  isFindOne = false
) {
  await dbConnect()
  // Construct the query object
  let query: Record<string, unknown> = {}
  if (param) query.param = param
  if (girl) query.girl = new mongoose.Types.ObjectId(girl)
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { title: { $regex: search, $options: "i" } }

  // Validate and sanitize pagination and sorting
  const validatedLimit = limit > 0 ? limit : DEFAULT_LIMIT
  const validatedPage = page > 0 ? page : DEFAULT_PAGE

  const sortFields: Record<string, 1 | -1> = {}
  if (sort_created) {
    sortFields["createdAt"] = sort_created
  }
  if (sort_level) {
    sortFields["isPrivate"] = sort_level
  }
  if (sort_updated) {
    sortFields["updatedAt"] = sort_updated
  }
  if (sort_views) {
    sortFields["view"] = sort_views
  }
  if (!sort_updated && !sort_level && !sort_created && !sort_views) {
    sortFields["updatedAt"] = DEFAULT_SORT
  }
  const pipeline: PipelineStage[] = [
    { $match: query },
    {
      $sort: sortFields,
    },
    { $skip: (validatedPage - 1) * validatedLimit },
    { $limit: validatedLimit },
    {
      $lookup: {
        from: "girls",
        localField: "girl",
        foreignField: "_id",
        as: "girl",
      },
    },
    {
      $unwind: {
        path: "$girl",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]
  if (isFindOne) {
    pipeline.push({ $limit: 1 })
  }
  const posts = await Post.aggregate(pipeline)
  return isFindOne ? posts[0] || null : posts
}

export function getOnlyPublicPost(
  searchParams: PostSearchParams = {},
  isFindOne = false
) {
  searchParams.isPrivate = false

  return getPost(searchParams, isFindOne)
}

export function getOnlyPrivatePost(
  searchParams: PostSearchParams = {},
  isFindOne = false
) {
  searchParams.isPrivate = true
  return getPost(searchParams, isFindOne)
}

export async function checkPostExists(searchParams: PostSearchParams = {}) {
  return (await getPost(searchParams, true)) != null
}
