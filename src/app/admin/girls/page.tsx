import ManageGirl from "@/components/Girls/Management/ManageGirl"
import { countGirlList, getGirl } from "@/services/girls"
import { GirlType } from "@/types/girls.types"
import React from "react"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const parsedLimit = parseInt((await searchParams).limit as string)
  const limit = !isNaN(parsedLimit) ? parsedLimit : 10
  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const search = (await searchParams).search as string | undefined
  const girls: GirlType[] = await getGirl({ page, limit, search }, false, true)
  const totalGirls = await countGirlList()
  const totalPages = Math.ceil(totalGirls / limit)
  return <ManageGirl girls={JSON.stringify(girls)} totalPages={totalPages} totalGirls={totalGirls} />
}
