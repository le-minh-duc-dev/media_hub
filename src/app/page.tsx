import Post from "@/components/Posts/Post"
import RelatedPosts from "@/components/Posts/RelatedPosts"
import { createDailyPost, getDailyPost } from "@/services/dailyPosts"
import { getPost } from "@/services/posts"
import getRandomPosts from "@/services/posts/getRandomPosts"
import { DailyPost } from "@/types/dailyPosts.types"

export default async function Home() {
  const posts = await getPost({ limit: 10 })
  let dailyPost: DailyPost | null = await getDailyPost(new Date())
  console.log(dailyPost)
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
    dailyPost = await getDailyPost(new Date())
  }
  if (!dailyPost) return <div>Chưa có bài viết</div>
  const post = dailyPost.privatePost ?? dailyPost.publicPost
  return (
    <div className="grid md:grid-cols-3 gap-6 gap-x-12">
      <div className="col-span-2">
        <Post post={JSON.stringify(post)} relatedPosts={JSON.stringify([])} />
      </div>
      <div className="mt-12">
        <div className="mt-12">
          <RelatedPosts
            posts={JSON.stringify(posts)}
            title="Các bài viết mới nhất"
          />
        </div>
      </div>
    </div>
  )
}
