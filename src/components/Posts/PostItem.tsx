import { PostType } from "@/types/posts.types"
import { Card, CardBody, Image } from "@nextui-org/react"
import Link from "next/link"
import React from "react"

export default function PostItem({ post }: { post: PostType }) {
  return (
    <Link href={`/posts/${post.param}`}>
      <Card className="h-32 lg:w-96 max-w-full  hover:bg-content2">
        <CardBody className="flex flex-row gap-x-4">
          <Image
            classNames={{
              img: "object-cover",
              wrapper: "h-full aspect-square",
            }}
            alt={post.title}
            radius="sm"
            src={post.body[0].url}
            height={100}
            width={100}
          />

          <div className="flex flex-col">
            <p className="text-md line-clamp-2 ">{post.title}</p>
            <div
              dangerouslySetInnerHTML={{ __html: post.description }}
              className="text-small text-default-500 line-clamp-1"
            />
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
