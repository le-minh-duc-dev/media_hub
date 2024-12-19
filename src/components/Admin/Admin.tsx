"use client"
import { revalidateDailyPost } from "@/serverActions/dailyPosts/revalidateDailyPost"
import { revalidateGirl } from "@/serverActions/girls/revalidateGirl"
import { revalidatePost } from "@/serverActions/posts/revalidatePost"
import { revalidateTopic } from "@/serverActions/topics/revalidateTopic"
import { Button } from "@nextui-org/react"
import React from "react"

export default function Admin() {
  async function fetchCreateDailyPost() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dailyPosts`)
      alert("Tạo bài viết mỗi ngày thành công")
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle standard Error objects
        alert("Có lỗi xảy ra! " + error.message)
      } else {
        // Handle non-standard errors
        alert("Có lỗi xảy ra!")
      }
    }
  }
  async function wrapperFn(fn: () => Promise<{ message: string }>) {
    const result = await fn()
    if (result?.message) alert(result?.message)
  }
  return (
    <div className="mt-12 ">
      <h1 className="text-3xl font-semibold text-center">Thiết lập chung</h1>
      <div className="mt-12">
        <h2 className="font-semibold mb-4">Các hành động</h2>
        <div className="w-full  border-2 border-foreground-500 rounded-lg p-4 flex gap-4 flex-wrap">
          <Button
            variant="flat"
            color="primary"
            onPress={() => {
              fetchCreateDailyPost()
            }}
          >
            Tạo bài viết mỗi ngày
          </Button>
          <Button
            variant="flat"
            color="primary"
            onPress={() => {
              wrapperFn(revalidateDailyPost)
            }}
          >
            Làm mới bài viết mỗi ngày (xóa cache)
          </Button>
          <Button
            variant="flat"
            color="primary"
            onPress={() => {
              wrapperFn(revalidatePost)
            }}
          >
            Làm mới các bài viết (xóa cache)
          </Button>
          <Button
            variant="flat"
            color="primary"
            onPress={() => {
              wrapperFn(revalidateGirl)
            }}
          >
            Làm mới các girl xinh (xóa cache)
          </Button>
          <Button
            variant="flat"
            color="primary"
            onPress={() => {
              wrapperFn(revalidateTopic)
            }}
          >
            Làm mới các thể loại (xóa cache)
          </Button>
        </div>
      </div>
    </div>
  )
}
