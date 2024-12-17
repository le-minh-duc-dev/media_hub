import { dbConnect } from "@/database/connect"
import Girl from "@/database/models/Girl"
import { GirlSearchParams } from "@/types/girls.types"

export async function countGirlList(searchParams: GirlSearchParams = {}) {
  //connect to database
  await dbConnect()

  const { topic, isPrivate, search } = searchParams

  let query: Record<string, unknown> = {}

  if (topic) query.topic = topic
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { $text: { $search: search } }
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
