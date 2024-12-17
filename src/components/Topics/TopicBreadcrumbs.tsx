"use client"
import { TopicType } from "@/types/topics.types"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useMemo } from "react"

export default function TopicBreadcrumbs(props: { topics: string }) {
  const topics: TopicType[] = useMemo(() => JSON.parse(props.topics), [props])
  const params = useParams()
  const topic = useMemo(
    () => topics.find((t) => t.param == (params.param as string)),
    [params, topics]
  )
  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link href="/">Trang chủ</Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link href={`/topics`}>Thể loại</Link>
      </BreadcrumbItem>
      {topic != null && (
        <BreadcrumbItem>
          <Link href={`/topics/${topic.param}`}>{topic.name}</Link>
        </BreadcrumbItem>
      )}
    </Breadcrumbs>
  )
}
