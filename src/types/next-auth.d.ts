import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: string
      url: string
      canAccessVipContent: boolean
      canUpdateContent: boolean
    } & DefaultSession["user"]
  }
}
interface Session {
  user: {
    role: string
    url: string
    canAccessVipContent: boolean
    canUpdateContent: boolean
  } & DefaultSession["user"]
}
