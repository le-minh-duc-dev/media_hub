'use client'
import React from "react"
import MutateTopic from "./MutateTopic"
import { TopicType } from "@/types/topics.types"
import { updateTopic } from "@/serverActions/topics"

export default function EditTopic(props: Readonly<{ initialTopic: string }>) {
  return (
    <MutateTopic
      initialTopic={props.initialTopic}
      onSubmit={async (data, setSubmitting, _id) => {
        const submitData: TopicType = { ...data }
        setSubmitting(true)
        const result = await updateTopic(_id!, submitData)
        setSubmitting(false)
        if (result?.message) alert(result.message)
      }}
    />
  )
}
