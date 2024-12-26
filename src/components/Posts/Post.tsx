"use client"
import { PostType } from "@/types/posts.types"
import React, { memo, useMemo, useState } from "react"
import PostBreadcrumbs from "./PostBreadcrumbs"
import { Button, Chip, Tab, Tabs, Tooltip } from "@nextui-org/react"
import { GirlType } from "@/types/girls.types"
import { formatDateTime, formatView } from "@/lib/utils"
import Link from "next/link"
import { TopicType } from "@/types/topics.types"
import { IoGrid } from "react-icons/io5"
import {
  FaChevronCircleUp,
  FaCrown,
  FaRegEdit,
  FaRegListAlt,
} from "react-icons/fa"
import ImagesList from "./ImagesList"
import useScrollingDown from "@/lib/customHooks/useScrollingDown"
import useScrollY from "@/lib/customHooks/useScrollY"
import RelatedPosts from "./RelatedPosts"
const Post = memo(function Post({
  showBreadcrumbs = true,
  ...props
}: {
  post: string
  relatedPosts: string
  showBreadcrumbs?: boolean
}) {
  const [isGridMode, setIsGridMode] = useState(false)
  const post: PostType = useMemo(() => JSON.parse(props.post), [props])
  const girl = post.girl as GirlType
  const isScrollingDown = useScrollingDown()
  const goToTop = useScrollY()
  return (
    <article className="mt-12">
      {isScrollingDown && (
        <Button
          isIconOnly
          aria-label="Go up"
          className="fixed bottom-12 right-12 z-50"
          onPress={() => {
            goToTop()
          }}
        >
          <FaChevronCircleUp />
        </Button>
      )}
      {showBreadcrumbs && <PostBreadcrumbs post={post} />}
      <h1 className="text-3xl mt-12 font-semibold ">{post.title}</h1>
      <div className="flex justify-between my-6">
        <div className="flex gap-x-4 items-center">
          <p className="font-semibold text-foreground-500 text-sm ">
            Cập nhật: {formatDateTime(post.updatedAt!)}
          </p>
          {post.isPrivate ? (
            <Tooltip
              content="Bài viết VIP"
              radius="full"
              classNames={{ content: "font-semibold" }}
            >
              <FaCrown className="text-yellow-500" />
            </Tooltip>
          ) : null}
        </div>
        <p className="font-semibold text-foreground-500 text-sm ">
          Lượt xem: {formatView(post.view)}
        </p>
      </div>
      <div className="flex items-center gap-x-2 ">
        <h3 className="font-semibold text-foreground-500 text-medium">
          Từ khóa:{" "}
        </h3>
        <Link href={`/girls/${girl.param}`}>
          <Chip>{girl.name}</Chip>
        </Link>
        <Link href={`/topics/${(girl.topic as TopicType).param}`}>
          <Chip>{(girl.topic as TopicType).name}</Chip>
        </Link>
      </div>
      <section className="mt-6 ">
        <div className="flex gap-x-4 items-center">
          <Tabs
            aria-label="Options"
            variant="bordered"
            onSelectionChange={(key) => {
              if (key == "list") {
                setIsGridMode(false)
                console.log("list")
              } else {
                setIsGridMode(true)
                console.log("grid")
              }
            }}
          >
            <Tab key="list" title={<FaRegListAlt />} />
            <Tab key="gird" title={<IoGrid />} />
          </Tabs>
          <Tooltip content="Chỉnh sửa bài viết">
            <Link
              className=" border-2 rounded p-2 border-foreground-600 h-11 flex justify-center items-center aspect-square"
              href={`/admin/posts/edit/${post.param}`}
            >
              <FaRegEdit className="text-lg" />
            </Link>
          </Tooltip>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post.description }}
          className="text-justify mt-12"
        />
        <ImagesList post={post} isGridMode={isGridMode} />
      </section>
      <section className="mt-12">
        <RelatedPosts
          title={`Các bài viết của ${girl.name}`}
          posts={props.relatedPosts}
        />
      </section>
    </article>
  )
})
export default Post
