import ManageTopics from "@/components/Topics/Management/ManageTopics"
import { countTopicList, getTopic } from "@/services/topics"
import { TopicType } from "@/types/topics.types"
import React from "react"
import { Metadata } from "next"
export async function generateMetadata(): Promise<Metadata> {
  const title = "Quản lý chủ đề"
  const description = "Chức năng quản lý chủ đề dành riêng cho quản trị viên của " + process.env.NEXT_PUBLIC_SITE_NAME
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/admin/topics`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: "admin/topics",
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
    },
  }
}
export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  //level
  const parsedSortLevel = parseInt((await searchParams).sort_level as string)
  const sort_level = !isNaN(parsedSortLevel)
    ? parsedSortLevel == 1
      ? 1
      : -1
    : undefined
  //
  //createdAt
  const parsedCreatedAt = parseInt((await searchParams).sort_created as string)
  const sort_created = !isNaN(parsedCreatedAt)
    ? parsedCreatedAt == 1
      ? 1
      : -1
    : undefined
  //
  //createdAt
  const parsedUpdatedAt = parseInt((await searchParams).sort_updated as string)
  const sort_updated = !isNaN(parsedUpdatedAt)
    ? parsedUpdatedAt == 1
      ? 1
      : -1
    : undefined
  //
  const parsedLimit = parseInt((await searchParams).limit as string)
  const limit = !isNaN(parsedLimit) ? parsedLimit : 10
  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const search = (await searchParams).search as string | undefined
  const topics: TopicType[] = await getTopic(
    { page, limit, search, sort_level, sort_created, sort_updated },
    false,
    true
  )
  const totalTopics = await countTopicList({ search })
  const totalPages = Math.ceil(totalTopics / limit)
  return (
    <ManageTopics
      topics={JSON.stringify(topics)}
      totalPages={totalPages}
      totalTopics={totalTopics}
    />
  )
}
