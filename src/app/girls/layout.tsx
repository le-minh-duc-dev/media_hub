import { auth } from "@/authentication/auth"
import RelatedPosts from "@/components/Posts/RelatedPosts"
import { getOnlyPublicPost, getPost } from "@/services/posts"
import { PostType } from "@/types/posts.types"
import React from "react"

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const relatedPosts: PostType[] = session?.user.canAccessVipContent
    ? await getPost({ limit: 20, page: 1 })
    : await getOnlyPublicPost({ limit: 20, page: 1 })
  return (
    <div className="mt-12 relative">
      {children}
      <div className="mt-12">
        <RelatedPosts
          posts={JSON.stringify(relatedPosts)}
          title="Các bài viết mới nhất"
        />
      </div>
    </div>
  )
}
