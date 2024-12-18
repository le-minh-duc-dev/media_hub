"use client"

import dynamic from "next/dynamic"
import { GirlType } from "@/types/girls.types"
import { PostBodyItem, PostType } from "@/types/posts.types"
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Switch,
} from "@nextui-org/react"
import React, { useState } from "react"
import FilePicker from "./FilePicker"
import { FaCrown } from "react-icons/fa"
import {
  useForm,
  SubmitHandler,
  Controller,
  UseFormSetValue,
} from "react-hook-form"
import ImageItem from "./ImageItem"
import { v4 as uuidv4 } from "uuid"
import { zodResolver } from "@hookform/resolvers/zod"
import { MutatePostSchema } from "@/zod/MutatePostSchema"
import UploadingModal from "./UploadingModal"
const TiptapEditor = dynamic(() => import("@/components/Tiptap/Tiptap"), {
  ssr: false,
  loading: () => <p>Editor loading...</p>,
})

export type LocalFile = {
  file: File
  id: string
}

export default function MutatePost(
  props: Readonly<{
    girls: string
    initialPost?: string
    onSubmit: (
      data: PostType,
      setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
      setUploadPercentage: React.Dispatch<React.SetStateAction<number>>
    ) => Promise<void>
    removeFn: (
      id: string,
      body: PostBodyItem[],
      setValue: UseFormSetValue<PostType>
    ) => void
  }>
) {
  let initialPost: PostType | undefined
  const girls: GirlType[] | undefined = JSON.parse(props.girls)
  if (props.initialPost) {
    initialPost = JSON.parse(props.initialPost)
  }
  //submitting
  const [submitting, setSubmitting] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  //
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
      view: initialPost?.view ?? Math.floor(Math.random() * 30000) + 10000,
    },
    resolver: zodResolver(MutatePostSchema),
  })
  const body = watch("body")
  const onSubmit: SubmitHandler<PostType> = async (data) => {
    await props.onSubmit(data, setSubmitting, setUploadPercentage)
  }
  console.log(errors)
  if (!girls) return <div>No girls yet.</div>
  return (
    <div className="mt-12 flex justify-center">
      <div>
        <UploadingModal isOpen={submitting} value={uploadPercentage} />
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
              isDisabled={submitting}
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
                  isDisabled={submitting}
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
                  isDisabled={submitting}
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
              isDisabled={submitting}
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
                  isDisabled={submitting}
                >
                  <div className="flex items-center gap-x-2">
                    Bài viết VIP <FaCrown className="text-yellow-500" />
                  </div>
                </Switch>
              )}
            />
          </div>

          {/* FilePicker */}

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

            {body.map((bodyItem) => (
              <ImageItem
                isDisabled={submitting}
                file={bodyItem.file}
                id={bodyItem.id!}
                url={bodyItem.url}
                removeFn={(id) => {
                  props.removeFn(id, body, setValue)
                  // const updatedBody = body.filter((item) => item.id !== id)
                  // setValue("body", updatedBody)
                }}
                key={bodyItem.id}
              />
            ))}
          </div>

          {/* Submit Button */}
          <Button
            color="primary"
            type="submit"
            isDisabled={submitting}
            isLoading={submitting}
          >
            {initialPost ? "Cập nhật" : "Tạo bài viết"}
          </Button>
        </form>
      </div>
    </div>
  )
}
