"use client"
import { TopicType } from "@/types/topics.types"
import { Tab, Tabs } from "@nextui-org/react"
import React, { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
type TabType = { param: string; name: string }
export default function TopicsMenu(props: { topics: string }) {
  const router = useRouter()
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

      <div className="hidden md:block">
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
                <Link
                  href={`/topics/${topic.param == "all" ? "" : topic.param}`}
                >
                  {topic.name}
                </Link>
              }
            ></Tab>
          )}
        </Tabs>
      </div>
      <div className="block md:hidden">
        <Tabs
          aria-label="Dynamic tabs"
          classNames={{ tabList: "grid grid-cols-3 w-full", base: "w-full" }}
          items={tabs}
          selectedKey={
            (params?.param as string) == "" ? "all" : (params?.param as string)
          }
          onSelectionChange={(key) => {
            router.push(`/topics/${key == "all" ? "" : key}`)
          }}
        >
          {(topic) => <Tab key={topic.param} title={topic.name}></Tab>}
        </Tabs>
      </div>
    </div>
  )
}
