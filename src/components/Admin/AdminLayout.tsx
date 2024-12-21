"use client"
import { Button,  } from "@nextui-org/react"
import React, { ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="mt-12">
      <div className="flex  justify-center lg:top-24 top-0">
        <div className=" grid grid-cols-2 lg:flex p-2 bg-content1 rounded-lg ">
          <CustomTab url="/admin">Thiết lập chung</CustomTab>
          <CustomTab url="/admin/posts">Quản lý bài viết</CustomTab>
          <CustomTab url="/admin/girls">Quản lý girl xinh</CustomTab>
          <CustomTab url="/admin/topics">Quản lý chủ đề</CustomTab>
        </div>
      </div>
      <div className="lg:mx-48 relative mt-12">{children}</div>
    </div>
  )
}
function CustomTab({
  children,
  url,
}: Readonly<{ children: ReactNode; url: string }>) {
  const currentPath = usePathname()
  console.log(currentPath)
  const router = useRouter()
  return (
    <Button
      onPress={() => {
        router.push(url)
      }}
      variant="flat"
      className={`${currentPath == url ? "bg-content2" : "bg-transparent"}`}
    >
      {children}
    </Button>
  )
}
