import TopicsMenu from "@/components/Topics/TopicsMenu"
import { getTopic } from "@/services/topics"
import React from "react"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const page = ((await searchParams).page as string) || "1"
  const topics = await getTopic({ limit: 10, page: parseInt(page) })
  return (
    <div>
      <div className="grid grid-cols-4">
        <TopicsMenu topics={JSON.stringify(topics)} />
      </div>
    </div>
  )
}
