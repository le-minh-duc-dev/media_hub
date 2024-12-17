import { getFileType, getTypeFileOfUrl } from "@/lib/utils"
import { Button, Image, Skeleton, Tooltip } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import VideoPreview from "@/components/VideoPreview"
export default function ImageItem({
  id,
  file,
  url,
  removeFn,
}: {
  id: string
  file?: File
  url?: string
  removeFn: (id: string) => void
}) {
  const [fileUrl, setFileUrl] = useState<undefined | string>(undefined)
  const [type, setType] = useState("image")
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setFileUrl(url)
      setType(getFileType(file.type))
      return () => URL.revokeObjectURL(url)
    } else {
      setFileUrl(url)
      setType(getTypeFileOfUrl(url!))
    }
  }, [file, url])
  if (!fileUrl)
    return <Skeleton className="w-full aspect-square rounded-xl"></Skeleton>
  return (
    <div className="relative  group">
      <Button
        isIconOnly
        radius="full"
        size="sm"
        className="absolute top-2 right-2 z-20 bg-black/50 group-hover:flex hidden"
        onPress={() => {
          removeFn(id)
        }}
      >
        <IoClose />
      </Button>
      {type == "image" ? (
        <Tooltip content={<Image alt="image" src={fileUrl} width={250} />}>
          <Image
            alt="image"
            src={fileUrl}
            classNames={{
              img: "w-full h-full object-cover",
              wrapper: "w-full  aspect-square overflow-hidden",
            }}
          />
        </Tooltip>
      ) : (
        <VideoPreview url={fileUrl} />
      )}
    </div>
  )
}
