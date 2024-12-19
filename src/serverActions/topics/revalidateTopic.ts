"use server"
import { GET_TOPIC_TAG } from "@/services/topics"
import { revalidateTag } from "next/cache"

export async function revalidateTopic() {
  revalidateTag(GET_TOPIC_TAG)
  return { message: "Làm mới thành công" }
}
