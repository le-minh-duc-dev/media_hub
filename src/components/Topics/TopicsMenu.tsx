"use client"
import { TopicType } from "@/types/topics.types"
import { Tab, Tabs } from "@nextui-org/react"
import React, { useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
type TabType = { param: string; name: string }
export default function TopicsMenu(props: { topics: string }) {
  const topics: TopicType[] = useMemo(() => JSON.parse(props.topics), [props])
  const params = useParams()

  const tabs = useMemo<TabType[]>(() => {
    const result: TabType[] = [{ param: "all", name: "Tất cả" }]
    topics.forEach((topic) =>
      result.push({ param: topic.param, name: topic.name })
    )
    return result
  }, [topics])
  return (
    <div className="">
      <h2 className="text-2xl font-semibold pb-2 mb-4 border-b border-b-foreground/15 w-fit">
        Thể loại
      </h2>

      <Tabs
        aria-label="Dynamic tabs"
        items={tabs}
        isVertical
        selectedKey={
          (params?.param as string) == "" ? "all" : (params?.param as string)
        }
      >
        {/* <Tab key="" title="Tất cả"></Tab> */}
        {(topic) => (
          <Tab
            key={topic.param}
            title={
              <Link href={`/topics/${topic.param == "all" ? "" : topic.param}`}>
                {topic.name}
              </Link>
            }
          ></Tab>
        )}
      </Tabs>
    </div>
  )
}
