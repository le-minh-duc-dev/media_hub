import { protectUpdateContentPage } from "@/authentication/protect"
import EditTopic from "@/components/Topics/Mutation/UpdateTopic"
import { getTopic } from "@/services/topics"

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ param: string }>
}>) {
  await protectUpdateContentPage()
  const param = (await params).param

  const topic = await getTopic({ param }, true)
  if (!topic) throw Error("There's no topic.")
  return <EditTopic initialTopic={JSON.stringify(topic)} />
}
