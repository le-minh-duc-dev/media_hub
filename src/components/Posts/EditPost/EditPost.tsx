"use client"
import dynamic from "next/dynamic"

import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Switch,
  Tooltip,
} from "@nextui-org/react"
import React, { useCallback, useRef } from "react"
import FilePicker from "./FilePicker"
import { FaCrown } from "react-icons/fa"
const TiptapEditor = dynamic(() => import("@/components/Tiptap/Tiptap"), {
  ssr: false,
})

export default function EditPost(props: {
  girls: string
  initialPost?: string
}) {
  let girls: GirlType[] | undefined
  let initialPost: PostType | undefined
  girls = JSON.parse(props.girls)
  if (props.initialPost) {
    initialPost = JSON.parse(props.initialPost)
  }
  //description
  const descriptionRef = useRef("")
  //handle description change
  const handleDescription = useCallback((value: string) => {
    descriptionRef.current = value
  }, [])


  if (!girls) throw Error("No girls.")
  return (
    <div className="mt-12 flex justify-center ">
      <div>
        <h1 className="text-3xl font-semibold text-center">
          {initialPost ? `Cập nhật bài viết` : "Tạo bài viết"}
        </h1>
        <section className="mt-12 grid gap-6">
          <Input
            label="Tiêu đề"
            type="text"
            labelPlacement="outside"
            defaultValue="Bộ ảnh nóng bỏng mới nhất của Ribi Sachi"
          />
          <div className="">
            <h3 className="text-sm mb-2">Mô tả</h3>
            <TiptapEditor initialContent="" onChange={handleDescription} />
          </div>
          <Autocomplete
            className="max-w-xs"
            label="Chọn girl xinh"
            labelPlacement="outside"
            defaultSelectedKey={girls[0]._id.toString()}
          >
            {girls.map((girl) => (
              <AutocompleteItem key={girl._id.toString()}>
                {girl.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Switch aria-label="Is public post">
            <div className="flex items-center gap-x-2">
              Bài viết VIP <FaCrown className="text-yellow-500" />
            </div>
          </Switch>
          <div className="grid p-4 grid-cols-5  lg:w-[600px] max-w-full xl:max-w-[1000px] min-h-96 bg-content2 rounded-xl">
            <FilePicker
              onPick={(files) => {
                console.log(files)
              }}
            />

          </div>
        </section>
      </div>
    </div>
  )
}
