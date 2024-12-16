import Topic from "@/components/Topics/Topic"
import { countGirlList, getGirl } from "@/services/girls"
import { getTopic } from "@/services/topics"
import { GirlType } from "@/types/girls.types"
import React from "react"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const limit = 16
  const topics = await getTopic()
  const relatedGirls: GirlType[] = await getGirl({ page, limit })
  const totalGirls = await countGirlList()
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
