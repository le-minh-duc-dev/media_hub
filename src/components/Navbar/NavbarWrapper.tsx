import { Navbar } from "@/components/Navbar/Navbar"
import { getGirl } from "@/services/girls"
import { getTopic } from "@/services/topics"

import React from "react"

export default async function NavbarWrapper() {
  const topics = await getTopic()
  const girls = await getGirl()
  return <Navbar topics={JSON.stringify(topics)} girls={JSON.stringify(girls)}/>
}
