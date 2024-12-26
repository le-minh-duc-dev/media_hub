"use server"
import { GET_USER_TAG } from "@/services/users"
import { revalidateTag } from "next/cache"

export async function revalidateUser() {
  revalidateTag(GET_USER_TAG)
  return { message: "Làm mới thành công" }
}
