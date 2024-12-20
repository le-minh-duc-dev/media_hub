import { auth } from "@/authentication/auth"
import Posts from "@/components/Posts/Posts"
import { countPostList, getOnlyPublicPost, getPost } from "@/services/posts"
import { countOnlyPublicPostList } from "@/services/posts/index"
import React from "react"

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
  const posts = session?.user.canAccessVipContent
    ? await getPost({ limit, page, search, isPrivate })
    : await getOnlyPublicPost({ limit, page, search })
  const totalPosts = session?.user.canAccessVipContent
    ? await countPostList({ search, isPrivate })
    : await countOnlyPublicPostList({ search })
  const totalPages = Math.ceil(totalPosts / limit)
  return <Posts posts={JSON.stringify(posts)} totalPages={totalPages} />
}
