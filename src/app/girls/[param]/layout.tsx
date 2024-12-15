import NewestPosts from "@/components/Posts/NewestPosts"
import { getPost } from "@/services/posts"
import { PostType } from "@/types/posts.types"
import React from "react"

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const newestPosts: PostType[] = await getPost({ limit: 20, page: 1 })
  return (
    <div className="mt-12">
      {children}
      <div className="mt-12">
        <NewestPosts posts={JSON.stringify(newestPosts)} />
      </div>
    </div>
  )
}
