"use client"
import { GirlType } from "@/types/girls.types"
import React, { useMemo } from "react"
import GirlItem from "./GirlItem"
import Link from "next/link"
import { Pagination } from "@nextui-org/react"
import { useParams, useRouter } from "next/navigation"
export default function GirlsWithTopic(
  props: Readonly<{ girls: string; totalPages: number; topicParam: string }>
) {
  const girls = useMemo<GirlType[]>(() => JSON.parse(props.girls), [props])
  const params = useParams()
  const page = !isNaN(parseInt(params.page as string))
    ? parseInt(params.page as string)
    : 1
  const router = useRouter()
  return (
    <>
      <div className="flex gap-4 flex-wrap mt-8">
        {girls.map((girl) => (
          <Link href={`/girls/${girl.param}`} key={girl._id as string}>
            <GirlItem girl={girl} />
          </Link>
        ))}
      </div>
      <div className="mt-12 ">
        <Pagination
          classNames={{base:"flex justify-center"}}
          isCompact
          showControls
          initialPage={page}
          onChange={(page) =>
            router.push(`/topics/${props.topicParam}?page=${page}`)
          }
          total={props.totalPages}
        />
      </div>
    </>
  )
}
