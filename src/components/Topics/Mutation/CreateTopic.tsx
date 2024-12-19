'use client'
import React from "react"
import MutateTopic from "./MutateTopic"
import { TopicType } from "@/types/topics.types"
import { createTopic } from "@/serverActions/topics"

export default function CreateTopic() {
  return (
    <MutateTopic
      onSubmit={async (data, setSubmitting) => {
        const submitData: TopicType = { ...data }
        setSubmitting(true)
        const result = await createTopic(submitData)
        setSubmitting(false)
        if (result?.message) alert(result.message)
      }}
    />
  )
}
