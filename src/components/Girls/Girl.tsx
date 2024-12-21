"use client"
import { GirlType } from "@/types/girls.types"
import React, { useMemo } from "react"

import Bio from "./Bio"
import { PostType } from "@/types/posts.types"
import PostItem from "../Posts/PostItem"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { TopicType } from "@/types/topics.types"
import GirlItem from "../Topics/GirlItem"
import Link from "next/link"
export default function Girl(
  props: Readonly<{ girl: string; relatedPosts: string; relatedGirls: string }>
) {
  const girl = useMemo<GirlType>(() => JSON.parse(props.girl), [props])
  const relatedGirls = useMemo<GirlType[]>(
    () => JSON.parse(props.relatedGirls),
    [props]
  )
  const relatedPosts = useMemo<PostType[]>(
    () => JSON.parse(props.relatedPosts),
    [props]
  )
  console.log(relatedPosts.length)
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href="/">Trang chủ</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/topics/${(girl.topic as TopicType).param}`}>
            {(girl.topic as TopicType).name}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/girls/${girl.param}`}>{girl.name}</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="grid lg:grid-cols-2 gap-12 mt-16">
        <Bio girl={girl} />
        <div className="border border-foreground/15 rounded-lg p-6 max-h-[75vh] overflow-y-auto">
          {relatedPosts.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-6">
                Các bài viết của {girl.name}
              </h2>
              <div className="flex gap-4 flex-wrap max-h-full min-h-0 overflow-y-auto">
                {relatedPosts.map((post) => (
                  <PostItem post={post} key={post._id as string} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              Chưa có bài viết.
            </div>
          )}
        </div>
      </div>
      <div className="mt-24">
        <h3 className="text-xl">
          Các girl xinh cùng chủ đề: {(girl.topic as TopicType).name}
        </h3>
        <div className="flex gap-4 flex-wrap mt-8 justify-center">
          {relatedGirls.map((girl) => (
            <Link href={`/girls/${girl.param}`} key={girl._id as string}>
              <GirlItem girl={girl} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
