import { protectUpdateContentPage } from "@/authentication/protect"
import CreatePost from "@/components/Posts/Mutation/CreatePost"
import { getGirl } from "@/services/girls"
import { GirlType } from "@/types/girls.types"
import { Metadata } from "next"
export async function generateMetadata(): Promise<Metadata> {
  const title = "Tạo bài viết"
  const description =
    "Trang tạo bài viết mới trong " + process.env.NEXT_PUBLIC_SITE_NAME
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/admin/posts/create`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: "admin/posts/create",
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
    },
  }
}
export default async function Page() {
  await protectUpdateContentPage()
  const girls: GirlType[] = await getGirl()

  return <CreatePost girls={JSON.stringify(girls)} />
}
