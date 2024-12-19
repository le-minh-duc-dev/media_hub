"use server"
import { GET_POST_TAG } from "@/services/posts"
import { revalidateTag } from "next/cache"

export async function revalidatePost() {
  revalidateTag(GET_POST_TAG)
  return { message: "Làm mới thành công" }

}
