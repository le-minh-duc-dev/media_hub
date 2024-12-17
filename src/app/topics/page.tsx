import { auth } from "@/authentication/auth"
import Topic from "@/components/Topics/Topic"
import {
  countGirlList,
  countOnlyPublicGirlList,
  getGirl,
  getOnlyPublicGirl,
} from "@/services/girls"
import { getTopic } from "@/services/topics"
import { GirlType } from "@/types/girls.types"
import React from "react"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await auth()

  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const limit = 16
  const topics = await getTopic()
  const relatedGirls: GirlType[] = session?.user.canAccessVipContent
    ? await getGirl({ page, limit })
    : await getOnlyPublicGirl({ page, limit })
  const totalGirls = session?.user.canAccessVipContent
    ? await countGirlList()
    : await countOnlyPublicGirlList()
  const totalPages = Math.ceil(totalGirls / limit)
  return (
    <Topic
      topics={topics}
      relatedGirls={relatedGirls}
      totalPages={totalPages}
      topicParam=""
    />
  )
}
