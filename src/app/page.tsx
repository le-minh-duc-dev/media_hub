import { auth } from "@/authentication/auth"
import Post from "@/components/Posts/Post"
import RelatedPosts from "@/components/Posts/RelatedPosts"
import { createDailyPost, getDailyPost } from "@/services/dailyPosts"
import { getOnlyPublicPost, getPost, getRandomPosts } from "@/services/posts"
import { DailyPost } from "@/types/dailyPosts.types"

export default async function Home() {
  const session = await auth()
  const posts = session?.user.canAccessVipContent
    ? await getPost({ limit: 10 })
    : await getOnlyPublicPost({ limit: 10 })
  const today = new Date()
  const searchDate = {
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  }
  let dailyPost: DailyPost | null = await getDailyPost(searchDate)

  if (!dailyPost) {
    const publicPosts = await getRandomPosts({ isPrivate: false })
    const privatePosts = await getRandomPosts({})
    let publicPost = null
    let privatePost = null
    if (publicPosts.length > 0) {
      publicPost = publicPosts[0]
    }
    if (privatePosts.length > 0) {
      privatePost = privatePosts[0]
    }

    await createDailyPost(privatePost?._id, publicPost?._id)
    dailyPost = await getDailyPost(searchDate)
  }
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
