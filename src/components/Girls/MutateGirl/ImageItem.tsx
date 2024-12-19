import { Image, Skeleton, Tooltip } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
export default function ImageItem({
  file,
  url,
}: Readonly<{
  file?: File
  url?: string
}>) {
  const [fileUrl, setFileUrl] = useState<undefined | string>(undefined)

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setFileUrl(url)

      return () => URL.revokeObjectURL(url)
    } else {
      setFileUrl(url)
    }
  }, [file, url])
  if (!fileUrl)
    return <Skeleton className="w-full aspect-square rounded-xl"></Skeleton>
  return (
    <Tooltip
      content={
        <div className="p-2">
          <Image alt="image" src={fileUrl} width={250} />
        </div>
      }
    >
      <Image
        alt="image"
        src={fileUrl}
        classNames={{
          img: "w-full h-full object-cover",
          wrapper: "w-full  aspect-square overflow-hidden",
        }}
      />
    </Tooltip>
  )
}
