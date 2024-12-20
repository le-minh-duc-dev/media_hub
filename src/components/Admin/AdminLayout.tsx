"use client"
import { Tab, Tabs } from "@nextui-org/react"
import Link from "next/link"
import React, { ReactNode } from "react"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const currentPath = usePathname()

  return (
    <div className="mt-12">
      <div className="flex flex-col absolute top-24 ">
        <h3 className="font-semibold text-center mb-4 text-foreground-400">
          Quản lý Girl xinh
        </h3>
        <Tabs
          classNames={{
            tab: "p-0",
          }}
          aria-label="Dynamic tabs"
          isVertical
          selectedKey={currentPath} // Dynamically set the selected tab based on the current path
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
      <div className="mx-48">{children}</div>
    </div>
  )
}
