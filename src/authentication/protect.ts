import { redirect } from "next/navigation"
import { auth } from "./auth"
import { Session } from "next-auth"

export async function protect(validator: (session: Session | null) => boolean) {
  const session = await auth()
  if (!session || !validator(session)) return redirect("/login")
}

export function protectUpdateContentPage() {
  return protect((session) => {
    return session?.user.canUpdateContent ?? false
  })
}

export async function protectUpdateContentApi(
  req: Request,
  handler: (req: Request) => Promise<Response>
): Promise<Response> {
  const session = await auth()
  if (!session?.user.canUpdateContent) {
    return Response.json({ status: false }, { status: 403 })
  }
  return await handler(req)
}
