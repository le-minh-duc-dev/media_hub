"use client"
import {  Spinner } from "@nextui-org/react"
import React from "react"

export default function Loading() {
  return (
    <div className=" flex justify-center items-center w-full h-[85vh]">
      {/* <div className="flex gap-6 h-1/2 w-1/2">
        <div>
          <Skeleton className="flex rounded-xl w-96 h-72" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-4 w-[85%] rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-[60%] rounded-lg" />
        </div>
      </div> */}
       <Spinner size="lg" />
    </div>
  )
}
