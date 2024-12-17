"use client"
import { PostType } from "@/types/posts.types"
import React, { ChangeEvent, FormEvent, useMemo, useRef } from "react"
import PostItem from "./PostItem"
import {
  BreadcrumbItem,
  Breadcrumbs,
  Input,
  Pagination,
} from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { IoSearchSharp } from "react-icons/io5"
import Link from "next/link"

export default function Posts(props: { posts: string; totalPages: number }) {
  const posts: PostType[] = useMemo(() => JSON.parse(props.posts), [props])
  const searchParams = useSearchParams()
  const page = !isNaN(parseInt(searchParams.get("page") ?? "1"))
    ? parseInt(searchParams.get("page") ?? "1")
    : 1
  const search = searchParams.get("search") ?? ""
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    router.push(`/posts?page=${page}&search=${inputRef.current!.value}`)
  }
  return (
    <div className=" mt-12">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href="/">Trang chủ</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/posts}`}>Tất cả bài viết</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="text-3xl font-semibold mt-12">Tất cả bài viết</h1>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value == "") {
                router.push(
                  `/posts?page=${page}&search=${inputRef.current!.value}`
                )
              }
            }}
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
