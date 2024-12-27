import { checkTopicExists } from "@/services/topics"
import { NextRequest } from "next/server"
import slug from "slug"

export async function POST(request: NextRequest) {
  const { name } = await request.json()
  if (!name) return Response.json({ status: true })
  const param = slug(name)
  return Response.json({ status: await checkTopicExists({ param }) })
}
