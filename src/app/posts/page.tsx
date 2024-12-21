import { auth } from "@/authentication/auth"
import Posts from "@/components/Posts/Posts"
import { countPostList, getOnlyPublicPost, getPost } from "@/services/posts"
import { countOnlyPublicPostList } from "@/services/posts/index"

import React from "react"

export async function generateMetadata() {
  const title = "Tất cả bài viết"
  const description = "Tất cả bài viết trong "+process.env.NEXT_PUBLIC_SITE_NAME
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/posts`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: ["/assets/images/logo.png"],
      locale: "vi_VN",
      type: "website",
      authors: [process.env.NEXT_PUBLIC_SITE_NAME!],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: process.env.NEXT_PUBLIC_SITE_NAME,
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
      images: ["/assets/images/logo.png"],
    },
  }
}

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await auth()
  const limit = 20
  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const search = (await searchParams).search as string | undefined
  const isPrivate =
    ((await searchParams).isPrivate as string | undefined) == "true"
      ? true
      : undefined
  const posts = session?.user.canAccessVipContent
    ? await getPost({ limit, page, search, isPrivate })
    : await getOnlyPublicPost({ limit, page, search })
  const totalPosts = session?.user.canAccessVipContent
    ? await countPostList({ search, isPrivate })
    : await countOnlyPublicPostList({ search })
  const totalPages = Math.ceil(totalPosts / limit)
  return <Posts posts={JSON.stringify(posts)} totalPages={totalPages} />
}
