"use client"
import { Button } from "@nextui-org/react"
import React from "react"

export default function Admin() {
  return (
    <div className="mt-12 ">
      <h1 className="text-3xl font-semibold text-center">Thiết lập chung</h1>
      <div className="mt-12">
        <h2 className="font-semibold mb-4">Các hành động</h2>
        <div className="w-full  border-2 border-foreground-500 rounded-lg p-4 flex gap-4 flex-wrap">
          <Button className="bg-blue-500/25 text-blue-300">
            Tạo bài viết mỗi ngày
          </Button>
          <Button className="bg-blue-500/25 text-blue-300">
            Làm mới viết mỗi ngày (xóa cache)
          </Button>
          <Button className="bg-blue-500/25 text-blue-300">
            Làm mới các bài viết (xóa cache)
          </Button>
          <Button className="bg-blue-500/25 text-blue-300">
            Làm mới các girl xinh (xóa cache)
          </Button>
          <Button className="bg-blue-500/25 text-blue-300">
            Làm mới các thể loại (xóa cache)
          </Button>
        </div>
      </div>
    </div>
  )
}
