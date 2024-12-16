"use client"
import { PostType } from "@/types/posts.types"
import React, { memo, useMemo } from "react"
import PostItem from "./PostItem"

const RelatedPosts = memo(function RelatedPosts(props: {
  posts: string
  title: string
}) {
  const posts: PostType[] = useMemo(() => JSON.parse(props.posts), [props])
  if (posts.length <= 0) return <></>
  return (
    <div className="">
      <h3 className="text-xl font-semibold">{props.title}</h3>
      <div className="flex gap-4 flex-wrap mt-8">
        {posts.map((post) => (
          <PostItem post={post} key={post._id as string} />
        ))}
      </div>
    </div>
  )
})
export default RelatedPosts
