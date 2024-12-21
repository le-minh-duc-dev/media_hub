import { protectUpdateContentPage } from "@/authentication/protect"
import CreateGirl from "@/components/Girls/Mutation/CreateGirl"
import { getTopic } from "@/services/topics"
import { TopicType } from "@/types/topics.types"
import React from "react"
import { Metadata } from "next"
export async function generateMetadata(): Promise<Metadata> {
  const title = "Tạo girl xinh"
  const description =
    "Trang tạo girl xinh mới trong " + process.env.NEXT_PUBLIC_SITE_NAME
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/admin/girls/create`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: "admin/girls/create",
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
    },
  }
}
export default async function page() {
  await protectUpdateContentPage()
  const topics: TopicType[] = await getTopic({})
  return <CreateGirl topics={JSON.stringify(topics)} />
}
