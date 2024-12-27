"use client"
import MutatePost from "./MutatePost"
import { PostType } from "@/types/posts.types"
import { getSignature, uploadFile } from "@/services/media/clientService"
import { createPost } from "@/serverActions/posts"
import { deleteLeakUploadedMedia } from "@/serverActions/deleteLeakUploadedMedia"
import slug from "slug"
import { useRouter } from "next/navigation"
export default function CreatePost(
  props: Readonly<{
    girls: string
    configuration: string
    initialPost?: string
  }>
) {
  const router = useRouter()
  return (
    <MutatePost
      configuration={props.configuration}
      girls={props.girls}
      initialPost={props.initialPost}
      onSubmit={async (
        data,
        setSubmitting,
        setUploadPercentage,
        cloudStorage
      ) => {
        const submitData: PostType = { ...data }
        const body = submitData.body
        setUploadPercentage(0)
        setSubmitting(true)
        const totalFile = body.filter((bodyItem) => !!bodyItem.file).length
        const signData = await getSignature(cloudStorage)
        await Promise.all(
          body.map(async ({ file }, index) => {
            if (!file) return
            let tried = 0
            let url = ""
            while (tried < 3 && !url) {
              url = await uploadFile(file, signData, cloudStorage)
              tried += 1
            }
            setUploadPercentage((pre) => pre + Math.floor(100 / totalFile))
            if (url != "") {
              console.log(`Upload file: ${file.name} successfully`)
              body[index].url = url
            } else {
              console.error("Uploading the file failed! : " + file.name)
            }
            delete body[index].file
          })
        )
        try {
          const result = await createPost(submitData)
          setSubmitting(false)
          if (result?.success) {
            alert("Tạo bài viết thành công")
            router.push(`/posts/${slug(submitData.title)}`)
          } else alert("Tạo bài viết thất bại")
        } catch (error) {
          console.log(error)
          await deleteLeakUploadedMedia(
            submitData.body.map((bodyItem) => bodyItem.url)
          )
          alert("Tạo bài viết thất bại")
        }
      }}
      removeFn={(id, body, setValue) => {
        const updatedBody = body.filter((item) => item.id !== id)
        setValue("body", updatedBody)
      }}
    />
  )
}
