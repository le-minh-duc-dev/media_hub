"use client"
import React, { useMemo } from "react"
import FullTable from "./FullTable"
import { TopicType } from "@/types/topics.types"

export default function ManageTopics(props: Readonly<{
  topics: string
  totalPages: number,
  totalTopics:number
}>) {
  const topics = useMemo<TopicType[]>(() => JSON.parse(props.topics), [props])
  
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Quản lý chủ đề</h1>
      <div className="mt-16">
        <p className="mb-4 font-semibold text-foreground-400">Tổng cộng: {props.totalTopics} (topic)</p>
        <FullTable topics={topics} totalPages={props.totalPages} />
      </div>
    </div>
  )
}
