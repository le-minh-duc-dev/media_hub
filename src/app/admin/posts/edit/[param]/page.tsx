import { protectUpdateContentPage } from "@/authentication/protect"
import EditPost from "@/components/Posts/Mutation/EditPost"
import { getGirl } from "@/services/girls"
import { getPost } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"

export default async function Page({
  params,
}: {
  params: Promise<{ param: string }>
}) {
  await protectUpdateContentPage()
  const param = (await params).param
  const [girls, post]: [GirlType[], PostType] = await Promise.all([
    await getGirl(),
    await getPost({ param }, true),
  ])
  return (
    <EditPost
      girls={JSON.stringify(girls)}
      initialPost={JSON.stringify(post)}
    />
  )
}
