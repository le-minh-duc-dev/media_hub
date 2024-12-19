"use server"
import { GET_DAILY_POST } from "@/services/dailyPosts"
import { revalidateTag } from "next/cache"

export async function revalidateDailyPost() {
  revalidateTag(GET_DAILY_POST)
  return { message: "Làm mới thành công" }
}
