import { dbConnect } from "@/database/connect"
import Topic from "@/database/models/Topic"
import { TopicSearchParams } from "@/types/topics.types"
import { unstable_cache } from "next/cache"

export const COUNT_TOPIC_LIST_TAG = "COUNT_TOPIC_LIST_TAG"
export function countTopicList(searchParams: TopicSearchParams = {}) {
  return unstable_cache(countTopicListNoCache, [], {
    tags: [COUNT_TOPIC_LIST_TAG],
  })(searchParams)
}

export async function countTopicListNoCache(
  searchParams: TopicSearchParams = {}
) {
  //connect to database
  await dbConnect()

  const { isPrivate, search } = searchParams

  let query: Record<string, unknown> = {}

  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { $text: { $search: search } }
  // console.log(query)
  const count = await Topic.countDocuments(query)
  return count
}

export function countOnlyPublicTopicList(searchParams: TopicSearchParams = {}) {
  searchParams.isPrivate = false
  return countTopicList(searchParams)
}

export function countOnlyPrivateTopicList(
  searchParams: TopicSearchParams = {}
) {
  searchParams.isPrivate = true
  return countTopicList(searchParams)
}
