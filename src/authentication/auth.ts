import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { dbConnect } from "../database/connect"
import { createUser, GET_USER_TAG, getUserByEmail } from "../services/users"
import { UserType } from "../types/users.types"
import { Role } from "./helper"
import { createConfiguration } from "@/services/configuration"
import mongoose from "mongoose"
import { CloudStorage } from "@/services/media/cloudStorage"
import { revalidateTag } from "next/cache"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async signIn({ profile }) {
      if (profile) {
        try {
          const user = await getUserByEmail(profile.email as string)

          if (!user) {
            await dbConnect()
            const dbSession = await mongoose.startSession()
            try {
              dbSession.startTransaction()
              const user = (await createUser(
                profile.name!,
                profile.email!,
                profile.picture,
                dbSession
              )) as UserType | null
              revalidateTag(GET_USER_TAG)
              console.log(user);
              if (user == null) throw Error("User is null")
              await createConfiguration(
                user._id.toString(),
                CloudStorage.default,
                dbSession
              )
              dbSession.commitTransaction()
            } catch (error) {
              console.log(error)
              dbSession.abortTransaction()
              return false
            }
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
      session.user.canAccessVipContent =
        user.role == Role.Vip || user.role == Role.Admin
      session.user.canUpdateContent = user.role == Role.Admin
      return session
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // },

    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = auth?.user !=undefined
    //   console.log("middleware");
    //   if (!isLoggedIn && nextUrl.pathname !== "/login") {
    //     const newUrl = new URL("/login", nextUrl.origin)
    //     return Response.redirect(newUrl)
    //   }
    //   return true
    // },
  },
})
