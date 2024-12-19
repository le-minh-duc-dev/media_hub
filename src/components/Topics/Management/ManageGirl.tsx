"use client"
import React, { useMemo } from "react"
import FullTable from "./FullTable"

export default function ManageGirl(props: Readonly<{
  girls: string
  totalPages: number,
  totalGirls:number
}>) {
  const girls = useMemo(() => JSON.parse(props.girls), [props])
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Quản lý girl xinh</h1>
      <div className="mt-16">
        <p className="mb-4 font-semibold text-foreground-400">Tổng cộng: {props.totalGirls} (girl xinh)</p>
        <FullTable girls={girls} totalPages={props.totalPages} />
      </div>
    </div>
  )
}
