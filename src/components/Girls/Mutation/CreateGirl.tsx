"use client"
import React from "react"
import MutateGirl from "./MutateGirl"
import { uploadFile } from "@/services/media/clientService"
import { createGirl } from "@/serverActions/girls"
import { GirlType } from "@/types/girls.types"
import { deleteLeakUploadedMedia } from "@/serverActions/deleteLeakUploadedMedia"
import { useRouter } from "next/navigation"

export default function CreateGirl(props: Readonly<{ topics: string }>) {
  const router = useRouter()
  return (
    <MutateGirl
      topics={props.topics}
      onSubmit={async (data, setSubmitting, setUploadPercentage, girlFile) => {
        const submitData: GirlType = { ...data }

        setUploadPercentage(0)
        setSubmitting(true)

        if (girlFile) {
          let tried = 0
          let url = ""
          while (tried < 3 && !url) {
            url = await uploadFile(girlFile)
            tried += 1
          }
          setUploadPercentage(100)
          if (url != "") {
            console.log(`Upload file: ${girlFile.name} successfully`)
            submitData.url = url
          } else {
            console.error("Uploading the file failed! : " + girlFile.name)
          }
        }
        try {
          const result = await createGirl(submitData)
          setSubmitting(false)
          if (result?.success) {
            alert("Tạo girl xinh thành công")
            router.push(`/admin/posts/create`)
          } else alert("Tạo girl xinh thất bại")
        } catch (error) {
          console.log(error)
          await deleteLeakUploadedMedia([submitData.url])
          alert("Tạo girl xinh thất bại")
        }
      }}
    />
  )
}
