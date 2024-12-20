import { auth } from "@/authentication/auth"
import { Navbar } from "@/components/Navbar/Navbar"
import { getGirl, getOnlyPublicGirl } from "@/services/girls"
import { getTopic } from "@/services/topics"
import { GirlType } from "@/types/girls.types"

import React from "react"

export default async function NavbarWrapper() {
  const session = await auth()
  const topics = await getTopic()
  const girls: GirlType[] = session?.user.canAccessVipContent
    ? await getGirl()
    : await getOnlyPublicGirl()
  return (
    <Navbar topics={JSON.stringify(topics)} girls={JSON.stringify(girls)} />
  )
}
