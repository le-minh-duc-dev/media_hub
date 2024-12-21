import AdminLayout from "@/components/Admin/AdminLayout"
import { Metadata } from "next"
import React, { ReactNode } from "react"

export async function generateMetadata(): Promise<Metadata> {
  const title = "Quản lý"
  const description = "Chức năng quản lý dành riêng cho quản trị viên của " + process.env.NEXT_PUBLIC_SITE_NAME
  return {
    title,
    openGraph: {
      title,
      description,
      url: `/admin`,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      siteId: "admin",
      creator: process.env.NEXT_PUBLIC_SITE_NAME,
      creatorId: process.env.NEXT_PUBLIC_SITE_NAME,
    },
  }
}
export default function layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
