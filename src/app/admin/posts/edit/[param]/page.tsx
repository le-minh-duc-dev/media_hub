import { auth } from "@/authentication/auth"
import { protectUpdateContentPage } from "@/authentication/protect"
import EditPost from "@/components/Posts/Mutation/EditPost"
import { getConfiguration } from "@/services/configuration"
import { getGirl } from "@/services/girls"
import { getPost } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import { Metadata } from "next"
export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ param: string }>
}>): Promise<Metadata> {
  const param = (await params).param

  const post = await getPost({ param }, true)
  const title = post.title
  const description = post.description ?? post.title
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/admin/posts/edit/${post.param}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: `admin/posts/edit/${post.param}`,
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
    },
  }
}
export default async function Page({
  params,
}: {
  params: Promise<{ param: string }>
}) {
  await protectUpdateContentPage()
  const param = (await params).param
  const session = await auth()
  const configuration= await getConfiguration(session!.user.id!)
  const [girls, post]: [GirlType[], PostType] = await Promise.all([
    await getGirl(),
    await getPost({ param }, true),
  ])
  return (
    <EditPost
      configuration={JSON.stringify(configuration)}
      girls={JSON.stringify(girls)}
      initialPost={JSON.stringify(post)}
    />
  )
}
