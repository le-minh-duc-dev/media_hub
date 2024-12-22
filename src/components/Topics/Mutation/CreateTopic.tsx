"use client"
import React from "react"
import MutateTopic from "./MutateTopic"
import { TopicType } from "@/types/topics.types"
import { createTopic } from "@/serverActions/topics"
import slug from "slug"
import { useRouter } from "next/navigation"

export default function CreateTopic() {
  const router = useRouter()

  return (
    <MutateTopic
      onSubmit={async (data, setSubmitting) => {
        const submitData: TopicType = { ...data }
        setSubmitting(true)
        const result = await createTopic(submitData)
        setSubmitting(false)
        if (result?.success) {
          alert("Tạo chủ đề thành công")
          router.push(`/topics/${slug(submitData.name)}`)
        } else {
          alert("Tạo chủ đề thất bại")
        }
      }}
    />
  )
}
