import { auth } from "@/authentication/auth"
import Topic from "@/components/Topics/Topic"
// import wait from "@/lib/simulateNetwork"
import {
  countGirlList,
  countOnlyPublicGirlList,
  getGirl,
  getOnlyPublicGirl,
} from "@/services/girls"
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
  const session = await auth()
  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const limit = 16
  const param = (await params).param
  // await wait(1000*1000)
  const topics: TopicType[] = await getTopic({})
  const topic = topics.find((t) => t.param.includes(param))
  if (!topic) throw Error()
  const relatedGirls: GirlType[] = session?.user.canAccessVipContent
    ? await getGirl({
        topic: topic._id.toString(),
        page,
        limit,
      })
    : await getOnlyPublicGirl({
        topic: topic._id.toString(),
        page,
        limit,
      })
  const totalGirls = session?.user.canAccessVipContent
    ? await countGirlList({ topic: topic._id.toString() })
    : await countOnlyPublicGirlList({ topic: topic._id.toString() })
  const totalPages = Math.ceil(totalGirls / limit)

  return (
    <Topic
      topicParam={topic.param}
      topics={topics}
      relatedGirls={relatedGirls}
      totalPages={totalPages}
    />
  )
}
