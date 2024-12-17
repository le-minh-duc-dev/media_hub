"use client"

import dynamic from "next/dynamic"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Switch,
} from "@nextui-org/react"
import React from "react"
import FilePicker from "./FilePicker"
import { FaCrown } from "react-icons/fa"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import ImageItem from "./ImageItem"
import { uploadFile } from "@/services/media/clientService"
import { v4 as uuidv4 } from "uuid"
import { zodResolver } from "@hookform/resolvers/zod"
import { ValidationSchema } from "./ValidationSchema"
const TiptapEditor = dynamic(() => import("@/components/Tiptap/Tiptap"), {
  ssr: false,
})

export type LocalFile = {
  file: File
  id: string
}

export default function EditPost(props: {
  girls: string
  initialPost?: string
}) {
  let initialPost: PostType | undefined
  const girls: GirlType[] | undefined = JSON.parse(props.girls)
  if (props.initialPost) {
    initialPost = JSON.parse(props.initialPost)
  }

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<PostType>({
    defaultValues: {
      title: initialPost?.title ?? "",
      description: initialPost?.description ?? "",
      girl:
        (initialPost?.girl &&
          ((initialPost?.girl as GirlType)._id as string)) ||
        (girls && (girls[0]._id as string)) ||
        "",
      isPrivate: initialPost?.isPrivate || false,
      body:
        initialPost?.body.map((bodyItem) => ({
          ...bodyItem,
          id: uuidv4(),
        })) ?? [],
      view: initialPost?.view ?? 0,
    },
    resolver: zodResolver(ValidationSchema),
  })
  const body = watch("body")
  const onSubmit: SubmitHandler<PostType> = async (data) => {
    const submitData: PostType = { ...data }
    const body = submitData.body
    // await Promise.all(
    //   body.map(async ({ file }, index) => {
    //     if (!file) return
    //     let tried = 0
    //     let url = ""
    //     while (tried < 3 && !url) {
    //       url = await uploadFile(file)
    //       tried += 1
    //     }
    //     if (url != "") {
    //       console.log(`Upload file: ${file.name} successfully`)
    //       body[index].url = url
    //     } else {
    //       console.error("Uploading the file failed! : " + file.name)
    //     }
    //     delete body[index].file
    //   })
    // )
    console.log(submitData)
  }
  if (!girls) return <div>No girls yet.</div>
  return (
    <div className="mt-12 flex justify-center">
      <div>
        <h1 className="text-3xl font-semibold text-center">
          {initialPost ? "Cập nhật bài viết" : "Tạo bài viết"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 grid gap-6">
          {/* Title Input */}
          <div>
            <Input
              {...register("title")}
              label="Tiêu đề"
              type="text"
              labelPlacement="outside"
              defaultValue={initialPost?.title ?? ""}
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
            />
          </div>

          {/* TiptapEditor - Mô tả */}
          <div>
            <h3 className="text-sm mb-2">Mô tả</h3>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TiptapEditor
                  initialContent={field.value || ""}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>

          {/* Autocomplete - Chọn girl xinh */}
          <div>
            <Controller
              name="girl"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  className="max-w-xs"
                  label="Chọn girl xinh"
                  labelPlacement="outside"
                  defaultSelectedKey={field.value as string}
                  onSelectionChange={(key) => field.onChange(key)}
                  isInvalid={!!errors.girl}
                  errorMessage={errors.girl?.message}
                >
                  {girls.map((girl) => (
                    <AutocompleteItem key={girl._id.toString()}>
                      {girl.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              )}
            />
          </div>
          {/* Title Input */}
          <div>
            <Input
              classNames={{ mainWrapper: "w-fit" }}
              {...register("view", {
                setValueAs: (value) => {
                  return value ? Number(value) : 0
                },
              })}
              label="Lượt xem"
              type="number"
              min={0}
              labelPlacement="outside"
              defaultValue={getValues().view.toString()}
              isInvalid={!!errors.view}
              errorMessage={errors.view?.message}
            />
          </div>
          {/* VIP Post Switch */}
          <div>
            <Controller
              name="isPrivate"
              control={control}
              render={({ field }) => (
                <Switch
                  isSelected={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  aria-label="Is VIP Post"
                >
                  <div className="flex items-center gap-x-2">
                    Bài viết VIP <FaCrown className="text-yellow-500" />
                  </div>
                </Switch>
              )}
            />
          </div>

          {/* FilePicker */}

          <div className="grid p-4 gap-2 grid-cols-5 lg:w-[600px] max-w-full xl:max-w-[1000px]  bg-content2 rounded-xl">
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <FilePicker
                  onPick={(localfiles) => {
                    const updatedFiles = [
                      ...field.value,
                      ...localfiles.map((localfile) => ({
                        url: "",
                        file: localfile.file,
                        id: localfile.id,
                        description: "",
                      })),
                    ]
                    field.onChange(updatedFiles)
                  }}
                />
              )}
            />

            {body.map((bodyItem) => (
              <ImageItem
                file={bodyItem.file}
                id={bodyItem.id!}
                removeFn={(id) => {
                  const updatedBody = body.filter((item) => item.id !== id)
                  setValue("body", updatedBody)
                }}
                key={bodyItem.id}
              />
            ))}
          </div>

          {/* Submit Button */}
          <Button color="primary" type="submit">
            {initialPost ? "Cập nhật" : "Tạo bài viết"}
          </Button>
        </form>
      </div>
    </div>
  )
}
