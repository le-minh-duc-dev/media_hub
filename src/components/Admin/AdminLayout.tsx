"use client"
import { Tab, Tabs } from "@nextui-org/react"
import Link from "next/link"
import React, { ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const currentPath = usePathname()
  const router = useRouter()
  return (
    <div className="mt-12">
      <div className="flex flex-col items-center lg:top-24 top-0">
        <Tabs
          classNames={{
            tab: "p-0",
            tabList: "grid grid-cols-2 lg:flex w-full",
            base: "w-full w-fit",
          }}
          aria-label="Dynamic tabs"
          selectedKey={currentPath}
          onSelectionChange={(key) => {
            router.push(key as string)
          }}
        >
          <Tab
            key="/admin"
            title={
              <Link href={`/admin`} className="block h-full px-2">
                Thiết lập chung
              </Link>
            }
          ></Tab>
          <Tab
            key="/admin/posts"
            title={
              <Link href={`/admin/posts`} className="block h-full px-2">
                Quản lý bài viết
              </Link>
            }
          ></Tab>
          <Tab
            key="/admin/girls"
            title={
              <Link href={`/admin/girls`} className="block h-full px-2">
                Quản lý girl xinh
              </Link>
            }
          ></Tab>
          <Tab
            key="/admin/topics"
            title={
              <Link href={`/admin/topics`} className="block h-full px-2">
                Quản lý chủ đề
              </Link>
            }
          ></Tab>
        </Tabs>
      </div>
      <div className="lg:mx-48 relative mt-12">{children}</div>
    </div>
  )
}
