"use client"
import React from "react"
import MutateTopic from "./MutateTopic"
import { TopicType } from "@/types/topics.types"
import { updateTopic } from "@/serverActions/topics"
import slug from "slug"
import { useRouter } from "next/navigation"

export default function EditTopic(props: Readonly<{ initialTopic: string }>) {
  const router = useRouter()
  return (
    <MutateTopic
      initialTopic={props.initialTopic}
      onSubmit={async (data, setSubmitting, _id) => {
        const submitData: TopicType = { ...data }
        setSubmitting(true)
        const result = await updateTopic(_id!, submitData)
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
