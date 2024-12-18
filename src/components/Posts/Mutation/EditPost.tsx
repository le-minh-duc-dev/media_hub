"use client"
import MutatePost from "./MutatePost"
import { PostType } from "@/types/posts.types"
import { uploadFile } from "@/services/media/clientService"

import { useRef } from "react"
import { updatePost } from "@/serverActions/posts"

export default function EditPost(
  props: Readonly<{
    girls: string
    initialPost?: string
  }>
) {
  const deletedUrlsRef = useRef<string[]>([])
  const uploadedUrlsRef = useRef<string[]>([])
  return (
    <div>
      <MutatePost
        girls={props.girls}
        initialPost={props.initialPost}
        onSubmit={async (data, setSubmitting, setUploadPercentage, _id) => {
          const submitData: PostType = { ...data }
          const body = submitData.body
          setUploadPercentage(0)
          setSubmitting(true)
          const totalFile = body.filter((bodyItem) => !!bodyItem.file).length
          await Promise.all(
            body.map(async ({ file }, index) => {
              if (!file) return
              let tried = 0
              let url = ""
              while (tried < 3 && !url) {
                url = await uploadFile(file)
                tried += 1
              }
              setUploadPercentage((pre) => pre + Math.floor(100 / totalFile))
              if (url != "") {
                console.log(`Upload file: ${file.name} successfully`)
                body[index].url = url
                uploadedUrlsRef.current.push(url)
              } else {
                console.error("Uploading the file failed! : " + file.name)
              }
              delete body[index].file
            })
          )

          const result = await updatePost(
            _id!,
            submitData,
            deletedUrlsRef.current,
            uploadedUrlsRef.current
          )
          setSubmitting(false)
          console.log(
            "Edit debug",
            submitData,
            deletedUrlsRef.current,
            uploadedUrlsRef.current
          )
          if (result?.message) alert(result.message)
        }}
        removeFn={(id, body, setValue) => {
          const updatedBody = body.filter((item) => item.id !== id)
          setValue("body", updatedBody)
          //add url to deleteurl list
          const item = body.find((it) => it.id == id)
          if (item?.url) {
            deletedUrlsRef.current.push(item.url)
          }
        }}
      />
     
    </div>
  )
}
