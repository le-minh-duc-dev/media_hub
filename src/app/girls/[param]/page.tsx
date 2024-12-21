import { auth } from "@/authentication/auth"
import Girl from "@/components/Girls/Girl"
import { getGirl, getOnlyPublicGirl } from "@/services/girls"
import { getOnlyPublicPost, getPost } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
import { TopicType } from "@/types/topics.types"
import { Metadata } from "next"
type Props = {
  params: Promise<{ param: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = (await params).param
  const girl: GirlType = await getGirl({ param }, true)

  return {
    title: girl.name,
    openGraph: {
      title: girl.name,
      description: girl.description ?? girl.name,
      url: `/girls/${girl.param}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [girl.url],

      locale: "vi_VN",
      type: "article",
      publishedTime: girl.createdAt,
      authors: [process.env.NEXT_PUBLIC_SITE_NAME!],
    },
    twitter: {
      card: "summary_large_image",
      title: girl.name,
      description: girl.description ?? girl.name,
      siteId: girl._id! as string,
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [girl.url],
    },
  }
}
export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ param: string }>
}>) {
  const session = await auth()
  const param = (await params).param
  const girl: GirlType = session?.user.canAccessVipContent
    ? await getGirl({ param }, true)
    : await getOnlyPublicGirl({ param }, true)
  console.log(session?.user.canAccessVipContent, girl)
  const relatedGirls: GirlType[] = session?.user.canAccessVipContent
    ? await getGirl({
        topic: (girl.topic as TopicType)._id!.toString(),
      })
    : await getOnlyPublicGirl({
        topic: (girl.topic as TopicType)._id!.toString(),
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
