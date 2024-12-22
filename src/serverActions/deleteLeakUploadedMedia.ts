"use server"

import { deleteMediaByURLs } from "@/services/media/mediaService"

export async function deleteLeakUploadedMedia(urls: string[]) {
  deleteMediaByURLs(urls)
}
