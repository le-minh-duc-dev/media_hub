"use client"
import { PostType } from "@/types/posts.types"
import React, { useMemo } from "react"
import PostItem from "./PostItem"

export default function NewestPosts(props: { posts: string }) {
  const posts: PostType[] = useMemo(() => JSON.parse(props.posts), [props])
  return (
    <div className="">
      <h3 className="text-xl">Các bài viết mới nhất</h3>
      <div className="flex gap-4 flex-wrap mt-8">
        {posts.map((post) => (
          <PostItem post={post} key={post._id as string} />
        ))}
      </div>
    </div>
  )
}
