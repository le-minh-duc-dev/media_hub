import RelatedPosts from "@/components/Posts/RelatedPosts"
import { getPost } from "@/services/posts"
import { PostType } from "@/types/posts.types"
import React from "react"

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const relatedPosts: PostType[] = await getPost({ limit: 20, page: 1 })
  return (
    <div className="mt-12">
      {children}
      <div className="mt-12">
        <RelatedPosts posts={JSON.stringify(relatedPosts)} title="Các bài viết mới nhất"/>
      </div>
    </div>
  )
}
