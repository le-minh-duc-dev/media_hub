"use client"
import { PostType } from "@/types/posts.types"
import React, { useMemo } from "react"
import PostItem from "./PostItem"
import { BreadcrumbItem, Breadcrumbs, Pagination } from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { SearchPosts } from "./SearchPosts"

export default function Posts(
  props: Readonly<{ posts: string; totalPages: number }>
) {
  const posts: PostType[] = useMemo(() => JSON.parse(props.posts), [props])
  const searchParams = useSearchParams()
  const page = !isNaN(parseInt(searchParams.get("page") ?? "1"))
    ? parseInt(searchParams.get("page") ?? "1")
    : 1
  const search = searchParams.get("search") ?? ""
  const router = useRouter()

  return (
    <div className=" mt-12">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href="/">Trang chủ</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/posts}`}>Tất cả bài viết</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="text-3xl font-semibold mt-12">Tất cả bài viết</h1>
      <SearchPosts />
      <div className="flex gap-4 flex-wrap mt-8">
        {posts.map((post) => (
          <PostItem post={post} key={post._id as string} />
        ))}
      </div>
      <div className="mt-12 ">
        <Pagination
          classNames={{ base: "flex justify-center" }}
          isCompact
          showControls
          initialPage={page}
          onChange={(page) =>
            router.push(`/posts?page=${page}&search=${search}`)
          }
          total={props.totalPages}
        />
      </div>
    </div>
  )
}
