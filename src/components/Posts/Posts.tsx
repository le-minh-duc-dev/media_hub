"use client"
import { PostType } from "@/types/posts.types"
import React, { FormEvent, useMemo, useRef } from "react"
import PostItem from "./PostItem"
import { Input, Pagination } from "@nextui-org/react"
import { useParams, useRouter } from "next/navigation"
import { IoSearchSharp } from "react-icons/io5"

export default function Posts(props: { posts: string; totalPages: number }) {
  const posts: PostType[] = useMemo(() => JSON.parse(props.posts), [props])
  const params = useParams()
  const page = !isNaN(parseInt(params.page as string))
    ? parseInt(params.page as string)
    : 1
  const search = (params.search as string) || ""
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    router.push(`/posts?page=${page}&search=${inputRef.current!.value}`)
  }
  return (
    <div className=" mt-12">
      <h1 className="text-3xl font-semibold">Tất cả bài viết</h1>
      <div className="max-w-96 my-12">
        <form onSubmit={onSubmit}>
          <Input
            ref={inputRef}
            isClearable
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            label="Search"
            placeholder="Type to search..."
            radius="lg"
            startContent={<IoSearchSharp />}
          />
        </form>
      </div>

      <div className="flex gap-4 flex-wrap mt-8">
        {posts.map((post) => (
          <PostItem post={post} key={post._id as string} />
        ))}
      </div>
      <div className="mt-12 ">
        <Pagination
          classNames={{ base: "flex justify-center" }}
          isCompact
          showControls
          initialPage={page}
          onChange={(page) =>
            router.push(`/posts?page=${page}&search=${search}`)
          }
          total={props.totalPages}
        />
      </div>
    </div>
  )
}
