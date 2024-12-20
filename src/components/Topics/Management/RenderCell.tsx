import { formatDateTime } from "@/lib/utils"
import { TopicType } from "@/types/topics.types"
import { Chip, Tooltip } from "@nextui-org/react"
import Link from "next/link"
import React, { Key } from "react"
import { RiEditLine } from "react-icons/ri"

export function renderCell(topic: TopicType, columnKey: Key) {
  switch (columnKey) {
    case "topic":
      return <Link href={`/topics/${topic.param}`} className="hover:underline">{topic.name}</Link>
    case "numOfGirls":
      return (
        <div className="flex flex-col ">
          <p className="text-bold text-sm ">{topic.numOfGirls ?? 0}</p>
        </div>
      )
    case "level":
      return (
        <Chip
          className="capitalize"
          color={topic.isPrivate ? "primary" : "default"}
          size="sm"
          variant="flat"
        >
          {topic.isPrivate ? "VIP" : "Public"}
        </Chip>
      )
    case "createdAt":
      return <div className="">{formatDateTime(topic.createdAt!)}</div>
    case "actions":
      return (
        <div className="relative flex items-center justify-center gap-2">
          <Tooltip content="Cập nhật topic">
            <Link
              href={`/admin/topics/edit/${topic.param}`}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <RiEditLine />
            </Link>
          </Tooltip>
        </div>
      )
  }
}
