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
