import RelatedPosts from "@/components/Posts/RelatedPosts"
import PostBreadcrumbsFake from "@/components/Posts/PostBreadcrumbsFake"
import { getOnlyPublicPost, getPost } from "@/services/posts"
import React, { ReactNode } from "react"
import { auth } from "@/authentication/auth"

export default async function layout({ children }: { children: ReactNode }) {
  const session = await auth()
  const posts = session?.user.canAccessVipContent
    ? await getPost({ limit: 10 })
    : await getOnlyPublicPost({ limit: 10 })
  return (
    <div className="grid md:grid-cols-3 md:gap-6 md:gap-x-12">
      <div className="md:col-span-2 relative">{children}</div>
      <div className="mt-12">
        <PostBreadcrumbsFake />
        <div className="mt-12">
          <RelatedPosts
            posts={JSON.stringify(posts)}
            title="Các bài viết mới nhất"
          />
        </div>
      </div>
    </div>
  )
}
