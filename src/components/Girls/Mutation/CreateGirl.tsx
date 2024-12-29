"use client"
import React from "react"
import MutateGirl from "./MutateGirl"
import { getSignature, uploadFile } from "@/services/media/clientService"
import { createGirl } from "@/serverActions/girls"
import { GirlType } from "@/types/girls.types"
import { deleteLeakUploadedMedia } from "@/serverActions/deleteLeakUploadedMedia"
import { useRouter } from "next/navigation"

export default function CreateGirl(
  props: Readonly<{ topics: string; configuration: string }>
) {
  const router = useRouter()
  return (
    <MutateGirl
      configuration={props.configuration}
      topics={props.topics}
      onSubmit={async (
        data,
        setSubmitting,
        setUploadPercentage,
        girlFile,
        cloudStorage
      ) => {
        const submitData: GirlType = { ...data }

        setUploadPercentage(0)
        setSubmitting(true)

        if (girlFile) {
          const signData = await getSignature(cloudStorage)
          let tried = 0
          let url = ""
          while (tried < 3 && !url) {
            url = await uploadFile(girlFile, signData, cloudStorage)
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
        let submitTries = 3
        while (submitTries-- > 0) {
          try {
            const result = await createGirl(submitData)
            if (result?.success) {
              setSubmitting(false)
              alert("Tạo girl xinh thành công")
              router.push(`/admin/posts/create`)
              return
            }
          } catch (error) {
            console.log(error)
          }
        }
        await deleteLeakUploadedMedia([submitData.url])
        alert("Tạo girl xinh thất bại")
      }}
    />
  )
}
