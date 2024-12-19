import { protectUpdateContentPage } from "@/authentication/protect"
import CreateGirl from "@/components/Girls/MutateGirl/CreateGirl"
import { getTopic } from "@/services/topics"
import { TopicType } from "@/types/topics.types"
import React from "react"

export default async function page() {
  await protectUpdateContentPage()
  const topics: TopicType[] = await getTopic({})
  return <CreateGirl topics={JSON.stringify(topics)} />
}
