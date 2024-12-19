import { dbConnect } from "@/database/connect"
import { GirlSearchParams } from "@/types/girls.types"
import Girl from "@/database/models/Girl"
import Topic from "@/database/models/Topic"
import { PopulateOptions } from "mongoose"
import { unstable_cache } from "next/cache"

export const GET_GIRL_TAG = "GET_GIRL_TAG"

const DEFAULT_LIMIT = 1000
const DEFAULT_PAGE = 1
const DEFAULT_SORT = -1 // Ascending

export function getGirl(
  searchParams: GirlSearchParams = {},
  isFindOne = false
) {
  return unstable_cache(getGirlNoCache, [], {
    tags: [GET_GIRL_TAG],
  })(searchParams, isFindOne)
}

export async function getGirlNoCache(
  searchParams: GirlSearchParams = {},
  isFindOne = false
) {
  //connect to database
  await dbConnect()
  const {
    param,
    topic,
    isPrivate,
    search,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    sort = DEFAULT_SORT,
  } = searchParams
  console.log(topic)
  let query: Record<string, unknown> = {}
  if (param) query.param = param
  if (topic) query.topic = topic
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { $text: { $search: search } }

  // Validate and sanitize pagination and sorting
  const validatedLimit = limit > 0 ? limit : DEFAULT_LIMIT
  const validatedPage = page > 0 ? page : DEFAULT_PAGE
  const validatedSort = sort

  const populateConfig: PopulateOptions = {
    path: "topic",
    select: "_id name param",
    model: Topic,
  }

  const girlList = !isFindOne
    ? await Girl.find(query)
        .sort({ updatedAt: validatedSort })
        .skip((validatedPage - 1) * validatedLimit)
        .limit(validatedLimit)
        .populate(populateConfig)
    : await Girl.findOne(query).populate(populateConfig)

  return girlList
}

export function getOnlyPublicGirl(
  searchParams: GirlSearchParams = {},
  isFindOne = false
) {
  searchParams.isPrivate = false
  return getGirl(searchParams, isFindOne)
}

export function getOnlyPrivateGirl(
  searchParams: GirlSearchParams = {},
  isFindOne = false
) {
  searchParams.isPrivate = true
  return getGirl(searchParams, isFindOne)
}

export async function checkGirlExists(searchParams: GirlSearchParams = {}) {
  return (await getGirl(searchParams, true)) != null
}
