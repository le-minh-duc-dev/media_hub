import Post from "@/components/Posts/Post"
import { getPost } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"

export default async function Page({
  params,
}: {
  params: Promise<{ param: string }>
}) {
  const param = (await params).param
  const post: PostType = await getPost({ param }, true)

  const relatedPosts = await getPost({ girl: (post.girl as GirlType)._id.toString() })
  console.log(post);
  return (
    <Post
      post={JSON.stringify(post)}
      relatedPosts={JSON.stringify(relatedPosts)}
     
    />
  )
}
