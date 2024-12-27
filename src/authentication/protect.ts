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
  handler: (req: Request) => Promise<Response>
): Promise<(req: Request) => Promise<Response>> {
  return async function (req: Request): Promise<Response> {
    const session = await auth();
    if (!session?.user.canUpdateContent) {
      return new Response(
        JSON.stringify({ status: false }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("in protect");
    return handler(req);
  };
}