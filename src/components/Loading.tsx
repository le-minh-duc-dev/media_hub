"use client"
import { Spinner } from "@nextui-org/react"
import React from "react"

export default function Loading() {
  return (
    <div className="absolute flex justify-center items-center">
      <Spinner />
    </div>
  )
}
