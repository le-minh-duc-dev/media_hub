"use client"
import { GirlType } from "@/types/girls.types"
import React, { useMemo } from "react"
import GirlItem from "./GirlItem"
import Link from "next/link"
import { Pagination } from "@nextui-org/react"
import { useSearchParams, useRouter } from "next/navigation"
export default function GirlsWithTopic(
  props: Readonly<{ girls: string; totalPages: number; topicParam: string }>
) {
  const girls = useMemo<GirlType[]>(() => JSON.parse(props.girls), [props])
  const searchParams = useSearchParams()
  const page = !isNaN(parseInt(searchParams.get('page')??'1'))
    ? parseInt(searchParams.get('page')??'1')
    : 1
  const router = useRouter()
  return (
    <>
      <div className="flex gap-4 flex-wrap mt-8 justify-center lg:justify-start">
        {girls.map((girl) => (
          <Link href={`/girls/${girl.param}`} key={girl._id as string}>
            <GirlItem girl={girl} />
          </Link>
        ))}
      </div>
      <div className="mt-12 ">
        <Pagination
          classNames={{ base: "flex justify-center" }}
          isCompact
          showControls
          page={page}
          onChange={(page) =>
            router.push(`/topics/${props.topicParam}?page=${page}`)
          }
          total={props.totalPages}
        />
      </div>
    </>
  )
}
