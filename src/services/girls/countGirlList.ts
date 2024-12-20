import { dbConnect } from "@/database/connect"
import Girl from "@/database/models/Girl"
import { GirlSearchParams } from "@/types/girls.types"
import { unstable_cache } from "next/cache"

export const COUNT_GIRL_LIST_TAG = "COUNT_GIRL_LIST_TAG"
export function countGirlList(searchParams: GirlSearchParams = {}) {
  return unstable_cache(countGirlListNoCache, [], {
    tags: [COUNT_GIRL_LIST_TAG],
  })(searchParams)
}

export async function countGirlListNoCache(
  searchParams: GirlSearchParams = {}
) {
  //connect to database
  await dbConnect()

  const { topic, isPrivate, search } = searchParams

  const query: Record<string, unknown> = {}

  if (topic) query.topic = topic
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query.name = { $regex: search, $options: "i" }
  // console.log(query)
  const count = await Girl.countDocuments(query)
  return count
}

export function countOnlyPublicGirlList(searchParams: GirlSearchParams = {}) {
  searchParams.isPrivate = false
  return countGirlList(searchParams)
}

export function countOnlyPrivateGirlList(searchParams: GirlSearchParams = {}) {
  searchParams.isPrivate = true
  return countGirlList(searchParams)
}
