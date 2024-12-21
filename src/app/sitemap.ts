import { getGirl } from "@/services/girls"
import { getPost } from "@/services/posts"
import { getTopic } from "@/services/topics"
import { GirlType } from "@/types/girls.types"
import { PostType } from "@/types/posts.types"
import { TopicType } from "@/types/topics.types"
import type { MetadataRoute } from "next"

interface Item {
  param: string
  createdAt?: string
}
async function generateSiteMap(
  items: Item[],
  priority1: number,
  priority2: number,
  partialUrl: string,
  changeFrequency:
    | "daily"
    | "weekly"
    | "always"
    | "hourly"
    | "monthly"
    | "yearly"
    | "never"
    | undefined = "weekly"
) {
  const itemsSiteMap = items.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${partialUrl}/${item.param}`,
    lastModified: new Date(item.createdAt!),
    changeFrequency,
    priority: priority1,
  }))
  itemsSiteMap.push({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${partialUrl}`,
    lastModified: new Date(),
    changeFrequency,
    priority: priority2,
  })
  return itemsSiteMap
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //TopicsSiteMap
  const topics: TopicType[] = await getTopic()
  const topicsSiteMap = await generateSiteMap(topics, 0.5, 0.5, "topics")
  //
  //girlsSiteMap
  const girls: GirlType[] = await getGirl()
  const girlsSiteMap = await generateSiteMap(girls, 1, 0.5, "girls")
  //
  //postsSiteMap
  const posts: PostType[] = await getPost()
  const postsSiteMap = await generateSiteMap(posts, 1, 0.8, "posts", "daily")
  //

  return [...topicsSiteMap, ...girlsSiteMap, ...postsSiteMap]
}
