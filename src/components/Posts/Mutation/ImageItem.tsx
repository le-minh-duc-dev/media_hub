import { getFileType, getTypeFileOfUrl } from "@/lib/utils"
import { Button, Image, Input,  Tooltip } from "@nextui-org/react"
import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import { FaRegCirclePlay } from "react-icons/fa6"
export default function ImageItem({
  index,
  bodyLength,
  id,
  file,
  url,
  removeFn,
  moveFn,
  isDisabled = false,
}: Readonly<{
  index: number
  bodyLength: number
  id: string
  file?: File
  url?: string
  removeFn: (id: string) => void
  moveFn: (index: number) => void
  isDisabled?: boolean
}>) {
  const [fileUrl, setFileUrl] = useState<undefined | string>(undefined)
  const [type, setType] = useState("image")
  const [inputValue, setInputValue] = useState(index)
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
    return (
      <div className="w-full aspect-square rounded-lg relative group animate-pulse bg-content2">
        {" "}
        <Button
          isIconOnly
          radius="full"
          size="sm"
          isDisabled={isDisabled}
          className="absolute top-2 right-2 z-50 bg-black/50 group-hover:flex hidden"
          onPress={() => {
            removeFn(id)
          }}
        >
          <IoClose />
        </Button>
      </div>
    )
  return (
    <div className="relative  group">
      <Button
        isIconOnly
        radius="full"
        size="sm"
        isDisabled={isDisabled}
        className="absolute top-2 right-2 z-20 bg-black/50 group-hover:flex hidden"
        onPress={() => {
          removeFn(id)
        }}
      >
        <IoClose />
      </Button>
      {type == "image" ? (
        <Tooltip
          content={
            <div className="p-2">
              <Image alt="image" src={fileUrl} width={250} />
              <div className="flex mt-4 items-center gap-x-4">
                <Input
                  value={inputValue.toString()}
                  onValueChange={(value) => {
                    if (!isNaN(parseInt(value))) setInputValue(parseInt(value))
                  }}
                  min={0}
                  max={bodyLength}
                  label="Vị trí"
                  labelPlacement="inside"
                  type="number"
                />
                <Button
                  onPress={() => {
                    moveFn(inputValue)
                  }}
                >
                  Di chuyển
                </Button>
              </div>
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
      ) : (
        <Tooltip
          placement="right"
          content={
            <div className="p-2">
              <div className="">
                <video src={url} muted controls className="w-96" />
              </div>
              <div className="flex mt-4 items-center gap-x-4">
                <Input
                  value={inputValue.toString()}
                  onValueChange={(value) => {
                    if (!isNaN(parseInt(value))) setInputValue(parseInt(value))
                  }}
                  min={0}
                  max={bodyLength}
                  label="Vị trí"
                  labelPlacement="inside"
                  type="number"
                />
                <Button
                  onPress={() => {
                    moveFn(inputValue)
                  }}
                >
                  Di chuyển
                </Button>
              </div>
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
      )}
    </div>
  )
}
