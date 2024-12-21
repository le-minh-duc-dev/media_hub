import { protectUpdateContentPage } from "@/authentication/protect"
import EditGirl from "@/components/Girls/Mutation/EditGirl"
import { getGirl } from "@/services/girls"
import { getTopic } from "@/services/topics"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import { TopicType } from "@/types/topics.types"

import { Metadata } from "next"
export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ param: string }>
}>): Promise<Metadata> {
  const param = (await params).param

  const girl: GirlType = await getGirl({ param }, true)
  const title = girl.name
  const description = girl.description ?? girl.name
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/admin/girls/edit/${girl.param}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: `admin/girls/edit/${girl.param}`,
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
    },
  }
}
export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ param: string }>
}>) {
  await protectUpdateContentPage()
  const param = (await params).param

  const [topics, girl]: [TopicType[], PostType] = await Promise.all([
    await getTopic(),
    await getGirl({ param }, true),
  ])
  if (!girl) throw Error("There's no girl.")
  return (
    <EditGirl
      topics={JSON.stringify(topics)}
      initialGirl={JSON.stringify(girl)}
    />
  )
}
