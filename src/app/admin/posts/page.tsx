import ManagePost from "@/components/Posts/Management/ManagePost"
import { countPostList, getPost } from "@/services/posts"
import { PostType } from "@/types/posts.types"
import { Metadata } from "next"
import React from "react"
export async function generateMetadata(): Promise<Metadata> {
  const title = "Quản lý bài viết"
  const description = "Chức năng quản lý bài viết dành riêng cho quản trị viên của " + process.env.NEXT_PUBLIC_SITE_NAME
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/admin/posts`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: "admin/posts",
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
  const parsedViews = parseInt((await searchParams).sort_views as string)
  const sort_views = !isNaN(parsedViews)
    ? parsedViews == 1
      ? 1
      : -1
    : undefined
  //
  const parsedLimit = parseInt((await searchParams).limit as string)
  const limit = !isNaN(parsedLimit) ? parsedLimit : 10
  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const search = (await searchParams).search as string | undefined
  const posts: PostType[] = await getPost({
    page,
    limit,
    search,
    sort_level,
    sort_created,
    sort_views,
  })
  const totalPosts = await countPostList({ search })
  const totalPages = Math.ceil(totalPosts / limit)
  return (
    <ManagePost
      posts={JSON.stringify(posts)}
      totalPages={totalPages}
      totalPosts={totalPosts}
    />
  )
}
