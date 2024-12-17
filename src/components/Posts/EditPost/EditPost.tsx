"use client"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import React from "react"

export default function EditPost(props: {
  girls: string
  initialPost?: string
}) {
  let girls: GirlType[]|undefined
  let initialPost: PostType|undefined
  girls = JSON.parse(props.girls)
  if (props.initialPost) {
    initialPost = JSON.parse(props.initialPost)
  }


  return <div>
    <h1>{initialPost? `Cập nhật bài viết`:"Tạo bài viết"}</h1>
    
  </div>
}
