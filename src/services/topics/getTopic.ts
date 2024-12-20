import { dbConnect } from "@/database/connect"
import { TopicSearchParams } from "@/types/topics.types"
import Topic from "@/database/models/Topic"
import { PipelineStage } from "mongoose"
import { unstable_cache } from "next/cache"

export const GET_TOPIC_TAG = "GET_TOPIC_TAG"

const DEFAULT_LIMIT = 1000
const DEFAULT_PAGE = 1
const DEFAULT_SORT = -1 // Ascending

export function getTopic(
  searchParams: TopicSearchParams = {},
  isFindOne = false,
  includeGirlsCount = false
) {
  return unstable_cache(getTopicNoCache, [], {
    tags: [GET_TOPIC_TAG],
  })(searchParams, isFindOne, includeGirlsCount)
}

export async function getTopicNoCache(
  searchParams: TopicSearchParams = {},
  isFindOne = false,
  includeGirlsCount = false
) {
  await dbConnect()
  const {
    param,
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
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { name: { $regex: search, $options: "i" } }

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

  const pipeline: PipelineStage[] = [
    { $match: query },
    {
      $sort: sortFields,
    },
    { $skip: (validatedPage - 1) * validatedLimit },
    { $limit: validatedLimit },
  ]

  // Conditionally add lookup and numOfGirls logic
  if (includeGirlsCount) {
    pipeline.push(
      {
        $lookup: {
          from: "girls",
          localField: "_id",
          foreignField: "topic",
          as: "girls",
        },
      },
      {
        $addFields: {
          numOfGirls: { $size: "$girls" },
        },
      },
      {
        $project: {
          girls: 0,
        },
      }
    )
  }

  // If finding a single document
  if (isFindOne) {
    pipeline.push({ $limit: 1 })
  }

  const topics = await Topic.aggregate(pipeline)
  return isFindOne ? topics[0] || null : topics
}

export function getOnlyPublicTopic(
  searchParams: TopicSearchParams = {},
  isFindOne = false,
  includeGirlsCount = false
) {
  searchParams.isPrivate = false
  return getTopic(searchParams, isFindOne, includeGirlsCount)
}

export function getOnlyPrivateTopic(
  searchParams: TopicSearchParams = {},
  isFindOne = false,
  includeGirlsCount = false
) {
  searchParams.isPrivate = true
  return getTopic(searchParams, isFindOne, includeGirlsCount)
}

export async function checkTopicExists(searchParams: TopicSearchParams = {}) {
  return (await getTopic(searchParams, true)) != null
}
