"use client"
import React, { useMemo } from "react"
import FullTable from "./FullTable"

export default function ManagePost(props: Readonly<{
  posts: string
  totalPages: number,
  totalPosts:number
}>) {
  const posts = useMemo(() => JSON.parse(props.posts), [props])
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Quản lý bài viết</h1>
      <div className="mt-16">
        <p className="mb-4 font-semibold text-foreground-400">Tổng cộng: {props.totalPosts} (bài viết)</p>
        <FullTable posts={posts} totalPages={props.totalPages} />
      </div>
    </div>
  )
}
