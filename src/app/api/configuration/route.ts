import { auth } from "@/authentication/auth"
import {
  GET_CONFIGURATION_TAG,
  updateConfiguration,
} from "@/services/configuration"
import { revalidateTag } from "next/cache"

export const POST = auth(async function POST(req) {
  const { cloudStorage } = await req.json()
  const user = req.auth!.user
  if (cloudStorage != "default" && cloudStorage != "v1")
    return Response.json({ status: false })
  await updateConfiguration(user.id!, cloudStorage)
  revalidateTag(GET_CONFIGURATION_TAG)
  return Response.json({ status: true })
})
