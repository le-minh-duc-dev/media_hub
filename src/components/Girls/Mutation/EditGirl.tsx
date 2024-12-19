'use client'
import React from "react"
import MutateGirl from "./MutateGirl"
import { uploadFile } from "@/services/media/clientService"
import { updateGirl } from "@/serverActions/girls"
import { GirlType } from "@/types/girls.types"

export default function EditGirl(
  props: Readonly<{
    topics: string
    initialGirl: string
  }>
) {
  return (
    <MutateGirl
      initialGirl={props.initialGirl}
      topics={props.topics}
      onSubmit={async (
        data,
        setSubmitting,
        setUploadPercentage,
        girlFile,
        _id
      ) => {
        const submitData: GirlType = { ...data }
        const oldUrl = submitData.url
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
        const result = await updateGirl(_id!, submitData, oldUrl)
        setSubmitting(false)
        if (result?.message) alert(result.message)
      }}
    />
  )
}
