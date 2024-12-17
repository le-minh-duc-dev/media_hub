import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import Link from "next/link"
import React from "react"

export default function PostBreadcrumbs({ post }: { post: PostType }) {
  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link href="/">Trang chủ</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href={`/posts`}>Bài viết</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href={`/girls/${(post.girl as GirlType).param}`}>
          {(post.girl as GirlType).name}
        </Link>
      </BreadcrumbItem>
    </Breadcrumbs>
  )
}
