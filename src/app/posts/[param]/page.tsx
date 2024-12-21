import { auth } from "@/authentication/auth"
import Post from "@/components/Posts/Post"
import { getTypeFileOfUrl } from "@/lib/utils"
import { getOnlyPublicPost, getPost } from "@/services/posts"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import { Metadata } from "next"
type Props = {
  params: Promise<{ param: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const param = (await params).param
  const post: PostType = await getPost({ param }, true)

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      description: post.description ?? post.title,
      url: `/posts/${post.param}`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: post.body
        .filter((bodyItem) => getTypeFileOfUrl(bodyItem.url) == "image")
        .map((bodyItem) => ({ url: bodyItem.url })),
      videos: post.body
        .filter((bodyItem) => getTypeFileOfUrl(bodyItem.url) == "video")
        .map((bodyItem) => ({ url: bodyItem.url })),
      locale: "vi_VN",
      type: "article",
      publishedTime: post.createdAt,
      authors: [process.env.NEXT_PUBLIC_SITE_NAME!],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? post.title,
      siteId: post._id! as string,
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
      images: post.body
        .filter((bodyItem) => getTypeFileOfUrl(bodyItem.url) == "image")
        .map((bodyItem) => ({ url: bodyItem.url })),
    },
  }
}
export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ param: string }>
}>) {
  const session = await auth()
  const param = (await params).param
  const post: PostType = session?.user.canAccessVipContent
    ? await getPost({ param }, true)
    : await getOnlyPublicPost({ param }, true)

  const relatedPosts = session?.user.canAccessVipContent
    ? await getPost({
        girl: (post.girl as GirlType)._id!.toString(),
      })
    : await getOnlyPublicPost({
        girl: (post.girl as GirlType)._id!.toString(),
      })

  return (
    <Post
      post={JSON.stringify(post)}
      relatedPosts={JSON.stringify(relatedPosts)}
    />
  )
}
