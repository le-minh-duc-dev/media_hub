import { Tooltip } from "@nextui-org/react"
import React from "react"
import { FaRegCirclePlay } from "react-icons/fa6"

export default function VideoPreview({
  url,
}: Readonly<{ url: string | undefined }>) {
  return (
    <Tooltip
    placement="right"
      content={
        <div className="">
          <video src={url} muted controls className="w-96" />
        </div>
      }
    >
      <div className="w-full aspect-square overflow-hidden rounded-xl relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
          <FaRegCirclePlay className="" />
        </div>
        <video src={url} muted className="w-full" />
      </div>
    </Tooltip>
  )
}
