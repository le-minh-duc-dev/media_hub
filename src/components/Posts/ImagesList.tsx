import { getTypeFileOfUrl } from "@/lib/utils"
import { PostType } from "@/types/posts.types"
import { Image } from "@nextui-org/react"
import React, { memo } from "react"
import { PhotoProvider, PhotoView } from "react-photo-view"

const ImagesList = memo(function ImagesList(props: {
  post: PostType
  isGridMode: boolean
}) {
  return (
    <div
      className={`grid gap-8 justify-center mt-12 ${
        props.isGridMode ? "grid-cols-3" : ""
      }`}
    >
      <PhotoProvider>
        {props.post.body.map((bodyItem) => (
          <ImageItem
            key={bodyItem.url}
            description={bodyItem.description}
            url={bodyItem.url}
            isGridMode={props.isGridMode}
          />
        ))}
      </PhotoProvider>
    </div>
  )
})
export default ImagesList
const elementSize = 400
function ImageItem({
  url,
  description,
  isGridMode,
}: Readonly<{
  url: string
  description?: string
  isGridMode: boolean
}>) {
  const type = getTypeFileOfUrl(url)
  const isImage = type == "image"
  const isVideo = type == "video"
  if (type == undefined) return null
  if (isImage)
    return (
      <PhotoView src={url}>
        <Image
          classNames={{
            img: `object-cover  ${isGridMode? "w-full h-full":"lg:w-[600] lg:h-[800] w-full h-[700]"}  `,
            wrapper: `overflow-hidden max-w-full max-h-full ${
              isGridMode ? "aspect-square" : ""
            }`,
          }}
          alt={description ?? "image"}
          radius="sm"
          src={url}
          // height={isGridMode ? undefined : 800}
          // width={isGridMode ? undefined : 600}
        />
      </PhotoView>
    )
  if (isVideo)
    return (
      <PhotoView
        width={elementSize}
        height={elementSize}
        render={({ attrs }) => {
          return (
            <div {...attrs}>
              <video src={url} controls className="w-full " muted></video>
            </div>
          )
        }}
      >
        <div className="">
          <video
            src={url}
            controls
            className="object-cover max-w-full"
            muted
            height={800}
            width={600}
          ></video>
        </div>
      </PhotoView>
    )
}
