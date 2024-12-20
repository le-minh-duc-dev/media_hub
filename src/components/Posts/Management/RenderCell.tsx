import { formatDateTime } from "@/lib/utils"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import { Chip, Image, Tooltip, User } from "@nextui-org/react"
import Link from "next/link"
import React, { Key } from "react"
import { RiEditLine } from "react-icons/ri"

export function renderCell(post: PostType, columnKey: Key) {
  switch (columnKey) {
    case "post":
      return (
        <Tooltip
          content={
            <div className="p-3">
              <h2 className="text-xl font-semibold text-wrap max-w-[300] mb-2">
                {post.title}
              </h2>
              <h3 className="text-sm font-semibold mb-6 text-foreground-500">
                {(post.girl as GirlType)?.name}
              </h3>
              <Image src={post.body[0].url} alt={post.title} width={300} />
            </div>
          }
          placement="right"
        >
          <Link href={`/posts/${post.param}`}>
            <User
              classNames={{ name: " truncate max-w-32" }}
              avatarProps={{ radius: "lg", src: post.body[0].url }}
              description={(post.girl as GirlType)?.name}
              name={post.title}
            />
          </Link>
        </Tooltip>
      )
    case "views":
      return (
        <div className="flex flex-col ">
          <p className="text-bold text-sm ">{post.view ?? 0}</p>
        </div>
      )
    case "level":
      return (
        <Chip
          className="capitalize"
          color={post.isPrivate ? "primary" : "default"}
          size="sm"
          variant="flat"
        >
          {post.isPrivate ? "VIP" : "Public"}
        </Chip>
      )
    case "createdAt":
      return <div className="">{formatDateTime(post.createdAt!)}</div>
    case "actions":
      return (
        <div className="relative flex items-center justify-center gap-2">
          <Tooltip content="Cập nhật bài viết">
            <Link
              href={`/admin/posts/edit/${post.param}`}
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              <RiEditLine />
            </Link>
          </Tooltip>
        </div>
      )
  }
}
