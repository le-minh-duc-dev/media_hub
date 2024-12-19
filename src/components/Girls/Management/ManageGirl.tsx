"use client"
import React, { useMemo } from "react"
import FullTable from "./FullTable"

export default function ManageGirl(props: { girls: string }) {
  const girls = useMemo(() => JSON.parse(props.girls), [props])
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Quản lý girl xinh</h1>
      <div className="mt-16">
        <FullTable girls={girls} />
      </div>
    </div>
  )
}
