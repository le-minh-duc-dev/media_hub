import { GirlType } from "@/types/girls.types"
import { Divider, Image, Tooltip } from "@nextui-org/react"
import Link from "next/link"
import React from "react"
import { FaCheckCircle, FaRegEdit } from "react-icons/fa"
import { PhotoProvider, PhotoView } from "react-photo-view"

export default function Bio({ girl }: Readonly<{ girl: GirlType }>) {
  return (
    <div className="grid lg:grid-cols-2 gap-6 gap-x-12">
      <PhotoProvider>
        <PhotoView src={girl.url}>
          <div className="flex justify-center">
            <Image
              isBlurred
              alt="NextUI Album Cover"
              className=" m-5"
              src={girl.url}
              width={250}
            />
          </div>
        </PhotoView>
      </PhotoProvider>
      <div className="">
        <div className="text-2xl font-semibold flex items-center gap-x-4">
          <h1>{girl.name}</h1>{" "}
          <FaCheckCircle className="text-blue-500 text-xl" />
        </div>
        😍😘💕
        <Divider className="my-4" />
        <div className="text-xl mb-4 flex items-center">
          Giới thiệu:{" "}
          <Tooltip content="Chỉnh sửa girl xinh">
            <Link
              className="  h-11 flex justify-center items-center aspect-square"
              href={`/admin/girls/edit/${girl.param}`}
            >
              <FaRegEdit className="text-lg" />
            </Link>
          </Tooltip>
        </div>
        <div
          className="shrink"
          dangerouslySetInnerHTML={{ __html: girl.description }}
        />
      </div>
    </div>
  )
}
