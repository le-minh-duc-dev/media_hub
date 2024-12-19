import { protectUpdateContentPage } from "@/authentication/protect"
import Admin from "@/components/Admin/Admin"
import React from "react"
export default async function page() {
  await protectUpdateContentPage()
  return <Admin />
}
