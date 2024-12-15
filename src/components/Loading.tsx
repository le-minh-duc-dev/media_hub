"use client"
import { CircularProgress } from "@nextui-org/react"
import React from "react"

export default function Loading() {
  return (
    <div className="absolute flex justify-center items-center">
      <CircularProgress aria-label="Loading..." color="default" />
    </div>
  )
}
