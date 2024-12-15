import Topic from "@/components/Topics/Topic"
import TopicsMenu from "@/components/Topics/TopicsMenu"
import { getGirl } from "@/services/girls"
import { getTopic } from "@/services/topics"
import { GirlType } from "@/types/girls.types"
import { TopicType } from "@/types/topics.types"
import React from "react"

export default async function page({
  searchParams,
  params,
}: {
  params: Promise<{ param: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const page = ((await searchParams).page as string) || "1"
  const param = (await params).param
  const topics: TopicType[] = await getTopic({
    limit: 10,
    page: parseInt(page),
  })
  const topic = topics.find((t) => t.param.includes(param))
  if (!topic) throw Error()
  const relatedGirls: GirlType[] = await getGirl({
    topic: topic._id.toString(),
  })
  return (
    <div className="mt-12">
      <div className="grid grid-cols-4">
        <TopicsMenu topics={JSON.stringify(topics)} />
        <div className="col-span-3">
          <Topic girls={JSON.stringify(relatedGirls)} />
        </div>
      </div>
    </div>
  )
}
