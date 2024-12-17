import { auth } from "@/authentication/auth"
import Girl from "@/components/Girls/Girl"
import { getGirl, getOnlyPublicGirl } from "@/services/girls"
import { getOnlyPublicPost, getPost } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
import { TopicType } from "@/types/topics.types"

export default async function Page({
  params,
}: {
  params: Promise<{ param: string }>
}) {
  const session = await auth()
  const param = (await params).param
  const girl: GirlType = session?.user.canAccessVipContent
    ? await getGirl({ param }, true)
    : await getOnlyPublicGirl({ param }, true)
  console.log( session?.user.canAccessVipContent,girl);
  const relatedGirls: GirlType[] = session?.user.canAccessVipContent
    ? await getGirl({
        topic: (girl.topic as TopicType)._id.toString(),
      })
    : await getOnlyPublicGirl({
        topic: (girl.topic as TopicType)._id.toString(),
      })
  const relatedPosts = session?.user.canAccessVipContent
    ? await getPost({ girl: girl._id as string })
    : await getOnlyPublicPost({ girl: girl._id as string })
  return (
    <Girl
      girl={JSON.stringify(girl)}
      relatedPosts={JSON.stringify(relatedPosts)}
      relatedGirls={JSON.stringify(relatedGirls)}
    />
  )
}
