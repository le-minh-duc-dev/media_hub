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
  Tooltip,
} from "@nextui-org/react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { FaCrown } from "react-icons/fa"
import {
  useForm,
  SubmitHandler,
  Controller,
  UseFormSetValue,
} from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { zodResolver } from "@hookform/resolvers/zod"
import { MutatePostSchema } from "@/zod/MutatePostSchema"
import UploadingModal from "../../UploadingModal"
import DangerousSection from "../../DangerousSection"
import FilesSection from "./FilesSection"
import { deletePost } from "@/serverActions/posts"
import { LuRefreshCcw } from "react-icons/lu"
import { PostTitlePosition, postTitles } from "@/lib/statements"
import { CloudStorageTypes } from "@/types/media.types"
import { ConfigurationType } from "@/types/configuration.types"
import { CloudStorage } from "@/services/media/cloudStorage"
import { debounce } from "@/lib/debouce"
import { checkPostExists } from "@/clientApi/posts"
import slug from "slug"
const TiptapEditor = dynamic(() => import("@/components/Tiptap/Tiptap"), {
  ssr: false,
  loading: () => <p>Editor loading...</p>,
})

export type LocalFile = {
  file: File
  id: string
}
const cloudStorages = [
  {
    title: "Mặc đinh",
    key: "default",
  },
  {
    title: "V1",
    key: "v1",
  },
]

export default function MutatePost(
  props: Readonly<{
    configuration: string
    girls: string
    initialPost?: string
    onSubmit: (
      data: PostType,
      setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
      setUploadPercentage: React.Dispatch<React.SetStateAction<number>>,
      cloudStorage: CloudStorageTypes,
      _id?: string
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
  const configuration: ConfigurationType | undefined = JSON.parse(
    props.configuration
  )
  if (props.initialPost) {
    initialPost = JSON.parse(props.initialPost)
  }
  //submitting
  const [submitting, setSubmitting] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  // for generating title automatically
  const generatedTitltesRef = useRef<string[]>([])
  //
  //for cloudinary account
  const [cloudStorage, setCloudStorage] = useState<CloudStorageTypes>(
    configuration?.cloudStorage ?? CloudStorage.default
  )
  //
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PostType>({
    defaultValues: {
      title:
        initialPost?.title ?? "Bộ sưu tập ảnh bikini mới nhất của Ribi Sachi",
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
    await props.onSubmit(
      data,
      setSubmitting,
      setUploadPercentage,
      cloudStorage,
      initialPost?._id?.toString()
    )
  }
  const generateTitle = () => {
    let index = Math.floor(Math.random() * postTitles.length)
    let title = postTitles[index]
    if (generatedTitltesRef.current.length >= postTitles.length) {
      generatedTitltesRef.current = []
    }

    while (generatedTitltesRef.current.includes(title.content)) {
      index = Math.floor(Math.random() * postTitles.length)
      title = postTitles[index]
    }
    // add to generated titles
    generatedTitltesRef.current.push(title.content)
    // set title
    const selectedGirl = girls!.find((girl) => girl._id == getValues().girl)
    if (title.position == PostTitlePosition.PREFIX) {
      setValue("title", `${title.content} ${selectedGirl?.name}`)
    } else {
      setValue("title", `${selectedGirl?.name} ${title.content}`)
    }
  }

  //check title exists
  const debounceCheckPostsExists = useCallback(
    debounce(async (title: string) => {
      const isExist = await checkPostExists(title)
      if (isExist && (initialPost && slug(title)!=initialPost.param)) {
        setError("title", { message: "Tiêu đề đã tồn tại" })
      } else {
        clearErrors("title")
      }
    }, 2000),
    []
  )

  const title = watch("title")
  useEffect(() => {
    if (!title) return

    debounceCheckPostsExists(title)
  }, [title, debounceCheckPostsExists])

  //
  console.log("Errors in form", errors)
  if (!girls) return <div>No girls yet.</div>
  return (
    <div className="mt-12 flex justify-center">
      <div>
        <UploadingModal
          message="Updating post..."
          isOpen={submitting}
          value={uploadPercentage}
        />
        <h1 className="text-3xl font-semibold text-center">
          {initialPost ? "Cập nhật bài viết" : "Tạo bài viết"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 grid gap-6">
          {/* Title Input */}
          <div
            className={`flex gap-4 ${
              errors.title ? "items-center" : "items-end"
            } `}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  label="Tiêu đề"
                  type="text"
                  labelPlacement="outside"
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                  }}
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                  isDisabled={submitting}
                />
              )}
            />

            <Tooltip content="Tạo tiêu đề tự động">
              <Button className="mt-4" isIconOnly onPress={generateTitle}>
                <LuRefreshCcw />
              </Button>
            </Tooltip>
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
                    <AutocompleteItem key={girl._id?.toString()}>
                      {girl.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              )}
            />
          </div>
          {/*Cloud storage */}

          <Autocomplete
            className="max-w-xs "
            label="Nơi lưu trữ"
            labelPlacement="outside"
            defaultSelectedKey={cloudStorage}
            onSelectionChange={(key) => {
              setCloudStorage(key as CloudStorageTypes)
              fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/configuration`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cloudStorage: key }),
              })
            }}
            isDisabled={submitting}
          >
            {cloudStorages.map((cloud) => (
              <AutocompleteItem key={cloud.key}>{cloud.title}</AutocompleteItem>
            ))}
          </Autocomplete>

          {/* View Input */}
          <div className="flex gap-4 justify-start items-end">
            <Input
              classNames={{ mainWrapper: "w-fit", base: "w-fit" }}
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
            <Button
              isIconOnly
              onPress={() => {
                setValue("view", Math.floor(Math.random() * 30000 + 10000))
              }}
            >
              <LuRefreshCcw />
            </Button>
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

          <FilesSection
            submitting={submitting}
            control={control}
            body={body}
            setValue={setValue}
            removeFn={props.removeFn}
          />

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
        {!!initialPost && (
          <DangerousSection
            afterDeletionUrl="/admin/posts"
            param={initialPost.param}
            deleteFn={deletePost}
            triggerButtonName="Xóa bài viết"
          />
        )}
      </div>
    </div>
  )
}
