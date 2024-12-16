import Posts from "@/components/Posts/Posts"
import { getPost } from "@/services/posts"
import countPostList from "@/services/posts/countPostList"
import React from "react"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const limit = 20
  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const search = (await searchParams).search as string | undefined
  const posts = await getPost({ limit, page, search })
  const totalPosts = await countPostList({ search })
  const totalPages = Math.ceil(totalPosts / limit)
  return <Posts posts={JSON.stringify(posts)} totalPages={totalPages} />
}
