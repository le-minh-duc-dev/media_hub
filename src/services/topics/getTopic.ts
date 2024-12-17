import { dbConnect } from "@/database/connect"

import Topic from "@/database/models/Topic"
import { TopicSearchParams } from "@/types/topics.types"
import { unstable_cache } from "next/cache"

export const GET_TOPIC_TAG = "GET_TOPIC_TAG"

const DEFAULT_LIMIT = 1000
const DEFAULT_PAGE = 1
const DEFAULT_SORT = -1 // Ascending

export function getTopic(
  searchParams: TopicSearchParams = {},
  isFindOne = false
) {
  return unstable_cache(getTopicNoCache, [], {
    tags: [GET_TOPIC_TAG],
  })(searchParams, isFindOne)
}

export async function getTopicNoCache(
  searchParams: TopicSearchParams = {},
  isFindOne = false
) {
  //connect to database
  await dbConnect()
  const {
    param,
    isPrivate,
    search,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    sort = DEFAULT_SORT,
  } = searchParams

  let query: Record<string, unknown> = {}
  if (param) query.param = param
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { $text: { $search: search } }

  const topicList = !isFindOne
    ? await Topic.find(query)
        .sort({ updatedAt: sort })
        .skip((page - 1) * limit)
        .limit(limit)
    : await Topic.findOne(query)
  return topicList
}
