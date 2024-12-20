import { formatDateTime } from "@/lib/utils"
import { GirlType } from "@/types/girls.types"
import { TopicType } from "@/types/topics.types"
import { Chip, Image, Tooltip, User } from "@nextui-org/react"
import Link from "next/link"
import React, { Key } from "react"
import { RiEditLine } from "react-icons/ri"

export function renderCell(girl: GirlType, columnKey: Key) {
  switch (columnKey) {
    case "girl":
      return (
        <Tooltip
          content={<Image src={girl.url} alt={girl.name} width={300} />}
          placement="right"
        >
          <Link href={`/girls/${girl.param}`}>
            <User
              avatarProps={{ radius: "lg", src: girl.url }}
              description={(girl.topic as TopicType)?.name}
              name={girl.name}
            />
          </Link>
        </Tooltip>
      )
    case "numOfPosts":
      return (
        <div className="flex flex-col ">
          <p className="text-bold text-sm ">{girl.numOfPosts ?? 0}</p>
        </div>
      )
    case "level":
      return (
        <Chip
          className="capitalize"
          color={girl.isPrivate ? "primary" : "default"}
          size="sm"
          variant="flat"
        >
          {girl.isPrivate ? "VIP" : "Public"}
        </Chip>
      )
    case "createdAt":
      return <div className="">{formatDateTime(girl.createdAt!)}</div>
    case "actions":
      return (
        <div className="relative flex items-center justify-center gap-2">
          <Tooltip content="Cập nhật girl xinh">
            <Link
              href={`/admin/girls/edit/${girl.param}`}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <RiEditLine />
            </Link>
          </Tooltip>
        </div>
      )
  }
}
