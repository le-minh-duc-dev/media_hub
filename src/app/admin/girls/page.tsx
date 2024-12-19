import ManageGirl from "@/components/Girls/Management/ManageGirl"
import { countGirlList, getGirl } from "@/services/girls"
import { GirlType } from "@/types/girls.types"
import React from "react"

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  //level
  const parsedSortLevel = parseInt((await searchParams).sort_level as string)
  const sort_level = !isNaN(parsedSortLevel)
    ? parsedSortLevel == 1
      ? 1
      : -1
    : undefined
  //
  //createdAt
  const parsedCreatedAt = parseInt((await searchParams).sort_created as string)
  const sort_created = !isNaN(parsedCreatedAt)
    ? parsedCreatedAt == 1
      ? 1
      : -1
    : undefined
  //
  //createdAt
  const parsedUpdatedAt = parseInt((await searchParams).sort_updated as string)
  const sort_updated = !isNaN(parsedUpdatedAt)
    ? parsedUpdatedAt == 1
      ? 1
      : -1
    : undefined
  //
  const parsedLimit = parseInt((await searchParams).limit as string)
  const limit = !isNaN(parsedLimit) ? parsedLimit : 10
  const parsedPage = parseInt((await searchParams).page as string)
  const page = !isNaN(parsedPage) ? parsedPage : 1
  const search = (await searchParams).search as string | undefined
  const girls: GirlType[] = await getGirl(
    { page, limit, search, sort_level, sort_created, sort_updated },
    false,
    true
  )
  const totalGirls = await countGirlList()
  const totalPages = Math.ceil(totalGirls / limit)
  return (
    <ManageGirl
      girls={JSON.stringify(girls)}
      totalPages={totalPages}
      totalGirls={totalGirls}
    />
  )
}
