import { CloudStorageTypes } from "@/types/media.types"

async function uploadFile(
  file: Blob,
  cloudStorage: CloudStorageTypes = "default"
) {
  const cloudName =
    cloudStorage == "default"
      ? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      : process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME_v2
  const cloudPreset =
    cloudStorage == "default"
      ? process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
      : process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_V2
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
  const fd = new FormData()
  fd.append("upload_preset", cloudPreset!)
  fd.append("file", file)

  try {
    const res = await fetch(url, {
      method: "POST",
      body: fd,
    })
    const data = await res.json()

    return data.secure_url || ""
  } catch (error) {
    console.log(error)
    return ""
  }
}

export { uploadFile }
