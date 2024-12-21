import CreateTopic from "@/components/Topics/Mutation/CreateTopic"
import React from "react"

import { Metadata } from "next"
export async function generateMetadata(): Promise<Metadata> {
  const title = "Tạo chủ đề"
  const description =
    "Trang tạo chủ đề mới trong " + process.env.NEXT_PUBLIC_SITE_NAME
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/admin/topics/create`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: "admin/topics/create",
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
    },
  }
}
export default function page() {
  return <CreateTopic />
}
