"use client"
import { Input, Switch } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, FormEvent, useRef } from "react"
import { FaCrown } from "react-icons/fa"
import { IoSearchSharp } from "react-icons/io5"

export function SearchTopics() {
  const session = useSession()
  const params = useParams()
  const param = params.param??""
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
      `/topics${param?`/${param}`:""}?page=${page}&search=${
        inputRef.current!.value
      }&isPrivate=${isPrivate}`
    )
  }
  return (
    <div className="  ">
      <form onSubmit={onSubmit} className="max-w-96 flex gap-x-6">
        <Input
          ref={inputRef}
          defaultValue={search}
         
          placeholder="Tìm kiếm girl xinh"
          radius="lg"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value == "") {
              router.push(
                `/topics${param?`/${param}`:""}?page=${page}&search=${
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
                `/topics${param?`/${param}`:""}?page=${page}&search=${
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
