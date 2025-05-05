import { auth } from "@/authentication/auth"
import Post from "@/components/Posts/Post"
import RelatedPosts from "@/components/Posts/RelatedPosts"
import { slogan } from "@/lib/statements"
import { getDailyPost } from "@/services/dailyPosts"
import { getOnlyPublicPost, getPost } from "@/services/posts"
import { DailyPost } from "@/types/dailyPosts.types"

export async function generateMetadata() {
  const title = "Trang chủ Media Hub"
  return {
    title,
    openGraph: {
      title,
      description: slogan,
      url: `/`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: ["/assets/images/logo.png"],
      locale: "vi_VN",
      type: "website",
      authors: [process.env.NEXT_PUBLIC_SITE_NAME!],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: slogan,
      siteId: process.env.NEXT_PUBLIC_SITE_NAME,
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
      images: ["/assets/images/logo.png"],
    },
  }
}
export default async function Home() {
  const session = await auth()
  const posts = session?.user.canAccessVipContent
    ? await getPost({ limit: 10 })
    : await getOnlyPublicPost({ limit: 10 })
  const today = new Date()
  const searchDate = {
    UTCDate: today.getUTCDate(),
    UTCMonth: today.getUTCMonth(),
    UTCYear: today.getUTCFullYear(),
  }
  const dailyPost: DailyPost | null = await getDailyPost(searchDate)

  if (!dailyPost) return <div>Chưa có bài viết</div>
  const post = session?.user.canAccessVipContent
    ? dailyPost.privatePost
    : dailyPost.publicPost
  return (
    <div className="grid md:grid-cols-3 gap-6 gap-x-12">
      <div className="col-span-2">
        <Post
          post={JSON.stringify(post)}
          relatedPosts={JSON.stringify([])}
          showBreadcrumbs={false}
        />
      </div>
      <div className="mt-12">
        <RelatedPosts
          posts={JSON.stringify(posts)}
          title="Các bài viết mới nhất"
        />
      </div>
    </div>
  )
}
