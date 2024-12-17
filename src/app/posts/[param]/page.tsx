import { auth } from "@/authentication/auth"
import Post from "@/components/Posts/Post"
import { getOnlyPublicPost, getPost } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"

export default async function Page({
  params,
}: {
  params: Promise<{ param: string }>
}) {
  const session = await auth()
  const param = (await params).param
  const post: PostType = session?.user.canAccessVipContent
    ? await getPost({ param }, true)
    : await getOnlyPublicPost({ param }, true)

  const relatedPosts = session?.user.canAccessVipContent
    ? await getPost({
        girl: (post.girl as GirlType)._id.toString(),
      })
    : await getOnlyPublicPost({
        girl: (post.girl as GirlType)._id.toString(),
      })

  return (
    <Post
      post={JSON.stringify(post)}
      relatedPosts={JSON.stringify(relatedPosts)}
    />
  )
}
