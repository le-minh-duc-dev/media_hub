import { v2 } from "cloudinary"
import {
  extractCloudName,
  extractPublicId,
  getTypeFileOfUrl,
} from "@/lib/utils"

function getConfig(url: string) {
  const cloudName = extractCloudName(url)
  const apiKey =
    cloudName == process.env.CLOUDINARY_CLOUD_NAME
      ? process.env.CLOUDINARY_KEY
      : process.env.CLOUDINARY_KEY_V2
  const apiSecret =
    cloudName == process.env.CLOUDINARY_CLOUD_NAME
      ? process.env.CLOUDINARY_SECRET
      : process.env.CLOUDINARY_SECRET_V2
  return {
    secure: true,
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  }
}
//
async function deleteImageByURL(url: string) {
  if (!url) return
  const publicId = extractPublicId(url)
  v2.config(getConfig(url))
  await v2.api.delete_resources([publicId])
}

async function deleteImagesByURLs(urls: string[]) {
  if (urls.length === 0) return
  v2.config(getConfig(urls[0]))
  await v2.api.delete_resources(urls.map((url) => extractPublicId(url)))
}

async function deleteVideosByURLs(urls: string[]) {
  if (urls.length === 0) return
  v2.config(getConfig(urls[0]))
  v2.api.delete_resources(
    urls.map((url) => extractPublicId(url)),
    {
      type: "upload",
      resource_type: "video",
    }
  )
}
async function deleteMediaByURLs(urls: string[]) {
  const imagePublicUrls: string[] = urls.filter(
    (url) => getTypeFileOfUrl(url) == "image"
  )
  const videoPublicUrls: string[] = urls.filter(
    (url) => getTypeFileOfUrl(url) == "video"
  )
  await deleteImagesByURLs(imagePublicUrls)
  await deleteVideosByURLs(videoPublicUrls)
}
export {
  deleteImageByURL,
  deleteImagesByURLs,
  deleteVideosByURLs,
  deleteMediaByURLs,
}
