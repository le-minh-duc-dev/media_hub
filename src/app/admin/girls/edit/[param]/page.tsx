import { protectUpdateContentPage } from "@/authentication/protect"
import EditGirl from "@/components/Girls/MutateGirl/EditGirl"
import { getGirl } from "@/services/girls"
import { getTopic } from "@/services/topics"
import { PostType } from "@/types/posts.types"
import { TopicType } from "@/types/topics.types"

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ param: string }>
}>) {
  await protectUpdateContentPage()
  const param = (await params).param

  const [topics, girl]: [TopicType[], PostType] = await Promise.all([
    await getTopic(),
    await getGirl({ param }, true),
  ])
  if (!girl) throw Error("There's no girl.")
  return (
    <EditGirl
      topics={JSON.stringify(topics)}
      initialGirl={JSON.stringify(girl)}
    />
  )
}
