"use server"
import { GET_GIRL_TAG } from "@/services/girls"
import { revalidateTag } from "next/cache"

export async function revalidateGirl() {
  revalidateTag(GET_GIRL_TAG)
  return { message: "Làm mới thành công" }

}
