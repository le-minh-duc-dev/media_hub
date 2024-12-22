import React from "react"
import { Control, Controller, UseFormSetValue } from "react-hook-form"
import FilePicker from "../../FilePicker"
import ImageItem from "./ImageItem"
import { PostBodyItem, PostType } from "@/types/posts.types"
import { Chip } from "@nextui-org/react"

export default function FilesSection({
  submitting,
  control,
  body,
  setValue,
  removeFn,
}: Readonly<{
  submitting: boolean
  control: Control<PostType> | undefined
  body: PostBodyItem[]
  setValue: UseFormSetValue<PostType>
  removeFn: (
    id: string,
    body: PostBodyItem[],
    setValue: UseFormSetValue<PostType>
  ) => void
}>) {
  return (
    <div
      className={`grid p-4 gap-2 grid-cols-5 lg:w-[600px] max-w-full xl:max-w-[1000px]  bg-content2 rounded-xl ${
        submitting ? "opacity-25" : ""
      }`}
    >
      <Controller
        name="body"
        control={control}
        render={({ field }) => (
          <FilePicker
            multiple
            isDisabled={submitting}
            onPick={(localfiles) => {
              const updatedFiles = [
                ...field.value,
                ...localfiles.map((localfile) => ({
                  file: localfile.file,
                  id: localfile.id,
                })),
              ]
              field.onChange(updatedFiles)
            }}
          />
        )}
      />

      {body.map((bodyItem, index) => (
        <div
          className="flex flex-col items-center gap-2 bg-content4 rounded-lg pb-2"
          key={bodyItem.id!+index}
        >
          <ImageItem
            bodyLength={body.length}
            moveFn={(newIndex) => {
              const temp = [...body]
              const [item] = temp.splice(index, 1);
              temp.splice(newIndex, 0, item);
              setValue("body", temp)
            }}
            index={index}
            isDisabled={submitting}
            file={bodyItem.file}
            id={bodyItem.id!}
            url={bodyItem.url}
            removeFn={(id) => {
              removeFn(id, body, setValue)
            }}
          />
          <Chip classNames={{content:"text-xs"}}>{index}</Chip>
        </div>
      ))}
    </div>
  )
}
