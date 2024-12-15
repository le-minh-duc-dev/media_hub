import { GirlType } from "@/types/girls.types"
import { Divider, Image } from "@nextui-org/react"
import React from "react"
import { FaCheckCircle } from "react-icons/fa"
import { PhotoProvider, PhotoView } from "react-photo-view"

export default function Bio({girl}:Readonly<{girl:GirlType}>) {
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
          {girl.name} <FaCheckCircle className="text-blue-500 text-xl" />
          😍😘💕
        </div>
        <Divider className="my-4" />
        <h2 className="text-xl mb-4">Giới thiệu:</h2>
        <div
          className="shrink"
          dangerouslySetInnerHTML={{ __html: girl.description }}
        />
      </div>
    </div>
  )
}
