import { v2 } from "cloudinary"
import { extractPublicId, getTypeFileOfUrl } from "lib/utils"
v2.config({
  secure: true,
})
async function uploadFile(file, type = "image") {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)
  const data = await new Promise((resolve, reject) => {
    v2.uploader
      .upload_stream(
        { folder: "girlxinh", resource_type: type },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      )
      .end(buffer)
  })

  return data?.secure_url || ""
}
async function deleteImageByURL(url) {
  if (!url) return
  const publicId = extractPublicId(url)
  await v2.api.delete_resources([publicId])
}

async function deleteImagesByURLs(urls) {
  if (urls.length === 0) return
  await v2.api.delete_resources(urls.map((url) => extractPublicId(url)))
}

async function deleteVideosByURLs(urls) {
  if (urls.length === 0) return
  v2.api.delete_resources(
    urls.map((url) => extractPublicId(url)),
    {
      type: "upload",
      resource_type: "video",
    }
  )
}
async function deleteMediaByURLs(urls) {
  let imagePublicUrls = urls.filter((url) => getTypeFileOfUrl(url) == "image")
  let videoPublicUrls = urls.filter((url) => getTypeFileOfUrl(url) == "video")
  await deleteImagesByURLs(imagePublicUrls)
  await deleteVideosByURLs(videoPublicUrls)
}
export {
  deleteImageByURL,
  deleteImagesByURLs,
  deleteVideosByURLs,
  deleteMediaByURLs,
  uploadFile
}
