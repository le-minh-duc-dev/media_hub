import { auth } from "@/authentication/auth"
import {
  GET_CONFIGURATION_TAG,
  updateConfiguration,
} from "@/services/configuration"
import { revalidateTag } from "next/cache"

export async function POST(req: Request): Promise<Response> {
  const session = await auth()
  const user = session!.user
  const { cloudStorage } = await req.json()
  if (cloudStorage != "default" && cloudStorage != "v1")
    return Response.json({ status: false })
  await updateConfiguration(user.id!, cloudStorage)
  revalidateTag(GET_CONFIGURATION_TAG)
  return Response.json({ status: true })
}
