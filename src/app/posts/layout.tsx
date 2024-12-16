import RelatedPosts from "@/components/Posts/RelatedPosts"
import PostBreadcrumbsFake from "@/components/Posts/PostBreadcrumbsFake"
import { getPost } from "@/services/posts"
import React, { ReactNode } from "react"

export default async function layout({ children }: { children: ReactNode }) {
  const posts = await getPost({ limit: 10 })
  return (
    <div className="grid md:grid-cols-3 gap-6 gap-x-12">
      <div className="col-span-2">{children}</div>
      <div className="mt-12">
        <PostBreadcrumbsFake />
        <div className="mt-12">
          <RelatedPosts posts={JSON.stringify(posts)} title="Các bài viết mới nhất" />
        </div>
      </div>
    </div>
  )
}
