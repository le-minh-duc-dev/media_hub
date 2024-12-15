"use client"
import { GirlType } from "@/types/girls.types"
import React, { useMemo } from "react"
import GirlItem from "./GirlItem"
import Link from "next/link"

export default function Topic(props: Readonly<{ girls: string }>) {
  const girls = useMemo<GirlType[]>(() => JSON.parse(props.girls), [props])
  return (
    <div className="flex gap-4 flex-wrap mt-8">
      {girls.map((girl) => (
        <Link href={`/girls/${girl.param}`} key={girl._id as string}>
          <GirlItem girl={girl} />
        </Link>
      ))}
    </div>
  )
}
