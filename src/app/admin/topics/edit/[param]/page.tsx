import { protectUpdateContentPage } from "@/authentication/protect"
import EditTopic from "@/components/Topics/Mutation/UpdateTopic"
import { getTopic } from "@/services/topics"
import { Metadata } from "next"
export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ param: string }>
}>): Promise<Metadata> {
  const param = (await params).param

  const topic = await getTopic({ param }, true)
  const title = topic.name
  const description = topic.description ?? topic.name
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/admin/topics/edit/${topic.param}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: `admin/topics/edit/${topic.param}`,
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
    },
  }
}
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
