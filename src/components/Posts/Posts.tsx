"use client"
import { PostType } from "@/types/posts.types"
import React, { ChangeEvent, FormEvent, useMemo, useRef } from "react"
import PostItem from "./PostItem"
import {
  BreadcrumbItem,
  Breadcrumbs,
  Input,
  Pagination,
  Switch,
} from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { IoSearchSharp } from "react-icons/io5"
import Link from "next/link"
import { FaCrown } from "react-icons/fa"
import { useSession } from "next-auth/react"

export default function Posts(props: { posts: string; totalPages: number }) {
  const session = useSession()
  const posts: PostType[] = useMemo(() => JSON.parse(props.posts), [props])
  const searchParams = useSearchParams()
  const page = !isNaN(parseInt(searchParams.get("page") ?? "1"))
    ? parseInt(searchParams.get("page") ?? "1")
    : 1
  const search = searchParams.get("search") ?? ""
  const isPrivate = searchParams.get("isPrivate") ?? ""
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    router.push(
      `/posts?page=${page}&search=${
        inputRef.current!.value
      }&isPrivate=${isPrivate}`
    )
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
      <div className=" my-12 ">
        <form onSubmit={onSubmit} className="max-w-96 flex gap-x-6">
          <Input
            ref={inputRef}
            defaultValue={search}
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
            label="Tìm kiếm bài viết"
            // placeholder="Gõ tên bài viết"
            radius="lg"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value == "") {
                router.push(
                  `/posts?page=${page}&search=${
                    inputRef.current!.value
                  }&isPrivate=${isPrivate}`
                )
              }
            }}
            startContent={<IoSearchSharp />}
          />
          {session.data?.user.canAccessVipContent && (
            <Switch
              isSelected={isPrivate == "true"}
              onValueChange={(value) => {
                router.push(
                  `/posts?page=${page}&search=${
                    inputRef.current!.value
                  }&isPrivate=${value}`
                )
              }}
            >
              <div className="flex gap-x-2 items-center">
                VIP <FaCrown className="text-yellow-500 text-xl" />
              </div>
            </Switch>
          )}
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
