import Girl from "@/components/Girls/Girl"
import { getGirl } from "@/services/girls"
import { getPost } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
import { TopicType } from "@/types/topics.types"

export default async function Page({
  params,
}: {
  params: Promise<{ param: string }>
}) {
  const param = (await params).param
  const girl: GirlType = await getGirl({ param }, true)
  const relatedGirls: GirlType[] = await getGirl({
    topic: (girl.topic as TopicType)._id.toString() ,
  })
  const relatedPosts = await getPost({ girl: girl._id as string })
  return (
    <Girl
      girl={JSON.stringify(girl)}
      relatedPosts={JSON.stringify(relatedPosts)}
      relatedGirls={JSON.stringify(relatedGirls)}
    />
  )
}
