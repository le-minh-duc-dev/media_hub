import { dbConnect } from "@/database/connect"
import { GirlSearchParams } from "@/types/girls.types"
import Girl from "@/database/models/Girl"
import { PipelineStage } from "mongoose"
import { unstable_cache } from "next/cache"

export const GET_GIRL_TAG = "GET_GIRL_TAG"

const DEFAULT_LIMIT = 1000
const DEFAULT_PAGE = 1
const DEFAULT_SORT = -1 // Ascending

export function getGirl(
  searchParams: GirlSearchParams = {},
  isFindOne = false,
  includePostCount = false
) {
  return unstable_cache(getGirlNoCache, [], {
    tags: [GET_GIRL_TAG],
  })(searchParams, isFindOne, includePostCount)
}

export async function getGirlNoCache(
  searchParams: GirlSearchParams = {},
  isFindOne = false,
  includePostCount = false
) {
  await dbConnect()
  const {
    param,
    topic,
    isPrivate,
    search,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    sort_created,
    sort_updated,
    sort_level,
  } = searchParams

  let query: Record<string, unknown> = {}
  if (param) query.param = param
  if (topic) query.topic = topic
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { $text: { $search: search } }

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
  if (!sort_updated && !sort_level && !sort_created) {
    sortFields["updatedAt"] = DEFAULT_SORT
  }
  console.log(sortFields);
  // Base pipeline
  const pipeline: PipelineStage[] = [
    { $match: query },
    {
      $sort: sortFields,
    },
    { $skip: (validatedPage - 1) * validatedLimit },
    { $limit: validatedLimit },
  ]

  // Conditionally add lookup and numOfPosts logic
  if (includePostCount) {
    pipeline.push(
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "girl",
          as: "posts",
        },
      },
      {
        $addFields: {
          numOfPosts: { $size: "$posts" },
        },
      },
      {
        $project: {
          posts: 0,
        },
      }
    )
  }

  // If finding a single document
  if (isFindOne) {
    pipeline.push({ $limit: 1 })
  }

  const girls = await Girl.aggregate(pipeline)
  return isFindOne ? girls[0] || null : girls
}

export function getOnlyPublicGirl(
  searchParams: GirlSearchParams = {},
  isFindOne = false,
  includePostCount = false
) {
  searchParams.isPrivate = false
  return getGirl(searchParams, isFindOne, includePostCount)
}

export function getOnlyPrivateGirl(
  searchParams: GirlSearchParams = {},
  isFindOne = false,
  includePostCount = false
) {
  searchParams.isPrivate = true
  return getGirl(searchParams, isFindOne, includePostCount)
}

export async function checkGirlExists(searchParams: GirlSearchParams = {}) {
  return (await getGirl(searchParams, true)) != null
}
