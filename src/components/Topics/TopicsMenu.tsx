"use client"
import { TopicType } from "@/types/topics.types"
import { Divider, Tab, Tabs } from "@nextui-org/react"
import React, { useMemo } from "react"
import { useParams } from "next/navigation"
export default function TopicsMenu(props: { topics: string }) {
  const topics: TopicType[] = useMemo(() => JSON.parse(props.topics), [props])
  const params = useParams()

  return (
    <div className="">
      <h2 className="text-2xl font-semibold pb-2 mb-4 border-b border-b-foreground/15 w-fit">
        Thể loại
      </h2>

      <Tabs
        aria-label="Dynamic tabs"
        items={topics}
        isVertical
        selectedKey={params?.param as string}
      >
        {/* <Tab key="" title="Tất cả"></Tab> */}
        {(topic) => (
          <Tab
            key={topic.param}
            title={topic.name}
            href={`/topics/${topic.param}`}
          ></Tab>
        )}
      </Tabs>
    </div>
  )
}
