import { checkPostExists } from "@/services/posts"
import { NextRequest } from "next/server"
import slug from "slug"

export async function POST(request: NextRequest) {
  const { title } = await request.json()
  if (!title) return Response.json({ status: true })
  const param = slug(title)
 return Response.json({ status: await checkPostExists({ param }) })
}
