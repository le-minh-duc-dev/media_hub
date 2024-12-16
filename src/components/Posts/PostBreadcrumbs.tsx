import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import React from "react"

export default function PostBreadcrumbs({ post }: { post: PostType }) {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Trang chủ</BreadcrumbItem>
      <BreadcrumbItem href={`/posts`}>Bài viết</BreadcrumbItem>
      <BreadcrumbItem href={`/girls/${(post.girl as GirlType).param}`}>
        {(post.girl as GirlType).name}
      </BreadcrumbItem>
    </Breadcrumbs>
  )
}
