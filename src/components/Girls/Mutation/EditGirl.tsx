"use client"
import React from "react"
import MutateGirl from "./MutateGirl"
import { getSignature, uploadFile } from "@/services/media/clientService"
import { updateGirl } from "@/serverActions/girls"
import { GirlType } from "@/types/girls.types"
import { deleteLeakUploadedMedia } from "@/serverActions/deleteLeakUploadedMedia"
import slug from "slug"
import { useRouter } from "next/navigation"

export default function EditGirl(
  props: Readonly<{
    configuration:string
    topics: string
    initialGirl: string
  }>
) {
  const router = useRouter()

  return (
    <MutateGirl
    configuration={props.configuration}
      initialGirl={props.initialGirl}
      topics={props.topics}
      onSubmit={async (
        data,
        setSubmitting,
        setUploadPercentage,
        girlFile,
        cloudStorage,
        _id
      ) => {
        const submitData: GirlType = { ...data }
        const oldUrl = submitData.url
        setUploadPercentage(0)
        setSubmitting(true)

        if (girlFile) {
           const signData = await getSignature(cloudStorage)
          let tried = 0
          let url = ""
          while (tried < 3 && !url) {
            url = await uploadFile(girlFile,signData,cloudStorage)
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
          const result = await updateGirl(_id!, submitData, oldUrl)
          setSubmitting(false)
          if (result?.success) {
            alert("Cập nhật girl xinh thành công")
            router.push(`/girls/${slug(submitData.name)}`)
          } else alert("Cập nhật girl xinh thất bại")
        } catch (error) {
          console.log(error)
          await deleteLeakUploadedMedia([oldUrl])
          alert("Cập nhật girl xinh thất bại")
        }
      }}
    />
  )
}
