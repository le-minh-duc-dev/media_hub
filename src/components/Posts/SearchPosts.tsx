import { Input, Switch } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, FormEvent, useRef } from "react"
import { FaCrown } from "react-icons/fa"
import { IoSearchSharp } from "react-icons/io5"

export function SearchPosts() {
  const session = useSession()
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
          placeholder="Tìm kiếm bài viết"
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
  )
}
