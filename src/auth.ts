import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { dbConnect } from "./database/connect"
import { createUser, getUserByEmail } from "./services/users"
import { UserType } from "./types/users.types"

declare module "next-auth" {
  interface Session {
    user: {
      role: string
      url: string
    } & DefaultSession["user"]
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      profile(profile) {
        // console.log(profile);
        return { role: profile.role ?? "user", ...profile }
      },
    }),
    GitHub,
  ],

  callbacks: {
    async signIn({ profile }) {
      if (profile) {
        try {
          await dbConnect()
          const user = await getUserByEmail(profile.email as string)

          if (!user) {
            createUser(profile.name!, profile.email!, profile.picture)
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }
      return true
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session }) {
      const user: UserType = await getUserByEmail(session.user.email)
      session.user.id = user._id.toString()
      session.user.name = user.name
      session.user.url = user.url
      session.user.role = user.role
      return session
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // },
  },
})
