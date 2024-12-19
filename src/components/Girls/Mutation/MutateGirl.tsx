import DangerousSection from "@/components/DangerousSection"
import FilePicker from "@/components/FilePicker"
import UploadingModal from "@/components/UploadingModal"
import { deleteGirl } from "@/serverActions/girls"
import { GirlType } from "@/types/girls.types"
import { TopicType } from "@/types/topics.types"
import { MutateGirlSchema } from "@/zod/MutateGirlSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Autocomplete,
  Input,
  AutocompleteItem,
  Switch,
  Button,
} from "@nextui-org/react"
import dynamic from "next/dynamic"
import React, { useMemo, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { FaCrown } from "react-icons/fa"
import ImageItem from "./ImageItem"
const TiptapEditor = dynamic(() => import("@/components/Tiptap/Tiptap"), {
  ssr: false,
  loading: () => <p>Editor loading...</p>,
})
export default function MutateGirl(
  props: Readonly<{
    topics: string
    initialGirl?: string
    onSubmit: (
      data: GirlType,
      setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
      setUploadPercentage: React.Dispatch<React.SetStateAction<number>>,
      girlFile: File | undefined,
      _id?: string
    ) => Promise<void>
  }>
) {
  const topics = useMemo<TopicType[]>(() => JSON.parse(props.topics), [props])
  let initialGirl: GirlType | undefined
  if (props.initialGirl) {
    initialGirl = JSON.parse(props.initialGirl)
  }
  //submitting
  const [submitting, setSubmitting] = useState(false)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  // girl image file
  const [girlFile, setGirlFile] = useState<File | undefined>(undefined)
  //
  const {
    control,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<GirlType>({
    defaultValues: {
      name: initialGirl?.name ?? "",
      description: initialGirl?.description ?? "",
      topic:
        (initialGirl?.topic &&
          ((initialGirl?.topic as GirlType)._id as string)) ||
        (topics && (topics[0]._id as string)) ||
        "",
      isPrivate: initialGirl?.isPrivate || false,
      url: initialGirl?.url ?? "",
    },
    resolver: zodResolver(MutateGirlSchema),
  })

  const onSubmit: SubmitHandler<GirlType> = async (data) => {
    await props.onSubmit(
      data,
      setSubmitting,
      setUploadPercentage,
      girlFile,
      initialGirl?._id?.toString()
    )
  }

  if (!topics) return <div>No topics yet.</div>
  return (
    <div className="mt-12 flex justify-center">
      <div>
        <UploadingModal
          message={
            initialGirl ? "Đang cập nhật girl xinh..." : "Đang tạo girl xinh..."
          }
          isOpen={submitting}
          value={uploadPercentage}
        />
        <h1 className="text-3xl font-semibold text-center">
          {initialGirl ? "Cập nhật girl xinh" : "Tạo girl xinh"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-12 grid gap-6">
          {/* Title Input */}
          <div>
            <Input
              {...register("name")}
              label="Họ và tên"
              type="text"
              labelPlacement="outside"
              defaultValue={initialGirl?.name ?? ""}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
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
              name="topic"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  className="max-w-xs"
                  label="Chọn chủ đề"
                  labelPlacement="outside"
                  defaultSelectedKey={field.value as string}
                  onSelectionChange={(key) => field.onChange(key)}
                  isInvalid={!!errors.topic}
                  errorMessage={errors.topic?.message}
                  isDisabled={submitting}
                >
                  {topics.map((topic) => (
                    <AutocompleteItem key={topic._id!.toString()}>
                      {topic.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              )}
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
                    Girl xinh VIP <FaCrown className="text-yellow-500" />
                  </div>
                </Switch>
              )}
            />
          </div>

          {/* FilePicker */}
          <div className="flex gap-x-4 ">
            <div className="w-48">
              <FilePicker
                allowedTypes={["image/*"]}
                multiple={false}
                isDisabled={submitting}
                onPick={(localfiles) => {
                  if (localfiles.length > 0) {
                    setGirlFile(localfiles[0].file)
                  }
                }}
              />
            </div>
            <div className="w-48">
              {(initialGirl?.url || girlFile) && (
                <ImageItem url={initialGirl?.url} file={girlFile} />
              )}
            </div>
          </div>
          {/* Submit Button */}
          <Button
            color="primary"
            type="submit"
            isDisabled={submitting}
            isLoading={submitting}
          >
            {initialGirl ? "Cập nhật" : "Tạo girl xinh"}
          </Button>
        </form>
        {!!initialGirl && (
          <DangerousSection
            param={initialGirl.param}
            deleteFn={deleteGirl}
            triggerButtonName="Xóa girl xinh"
          />
        )}
      </div>
    </div>
  )
}
