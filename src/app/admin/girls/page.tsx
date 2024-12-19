import ManageGirl from "@/components/Girls/Management/ManageGirl"
import { getGirl } from "@/services/girls"
import { GirlType } from "@/types/girls.types"
import React from "react"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const parsedLimit = parseInt((await searchParams).limit as string)
  const limit = !isNaN(parsedLimit) ? parsedLimit : 20
  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const search = (await searchParams).search as string | undefined
  const girls: GirlType[] = await getGirl({ page, limit, search })
  return <ManageGirl girls={JSON.stringify(girls)} />
}
