export function getFileType(mimeType: string) {
  if (mimeType.startsWith("image/")) {
    return "image"
  } else if (mimeType.startsWith("video/")) {
    return "video"
  } else {
    return "unknown"
  }
}

export function getTypeFileOfUrl(url: string) {
  let ext: string | string[] | undefined = url.split(".")

  ext = ext.pop()?.toLowerCase()
  if (ext) {
    // Video file extensions
    if (["mp4", "mov", "avi", "mkv"].includes(ext)) {
      return "video"
    }
    // Image file extensions
    else if (
      ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "webp"].includes(ext)
    ) {
      return "image"
    }
  }

  return "unknown"
}


export function formatDateTime(rawDateTime: string) {
  const dateObj = new Date(rawDateTime)
  const hours = dateObj.getUTCHours().toString().padStart(2, "0")
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0")
  const day = dateObj.getUTCDate().toString().padStart(2, "0")
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0")
  const year = dateObj.getUTCFullYear()

  return `${hours}:${minutes} ${day}/${month}/${year}`
}

function removeHtmlTags(text: string) {
  // Define the regex pattern to match HTML tags
  const pattern = /<[^>]*>/g

  // Replace HTML tags with an empty string
  const plainText = text.replace(pattern, "")

  return plainText
}

export { removeHtmlTags }

export function reviewParagraph(paragraph: string, lineNumber = 2) {
  if (!paragraph) return ""

  const sentenceList = removeHtmlTags(paragraph).split(".")
  if (sentenceList.length < 2) return paragraph
  else if (lineNumber == 2) return sentenceList[0] + "." + sentenceList[1] + "."
  else return sentenceList[0]
}

export function extractPublicId(cloudinarySecureUrl: string) {
  if (!cloudinarySecureUrl) return ""
  const parts = cloudinarySecureUrl.split("/")
  if (parts.length < 2) return ""

  const extractedPart =
    parts[parts.length - 2] + "/" + parts[parts.length - 1].split(".")[0]
  return extractedPart
}

export function extractCloudName(cloudinarySecureUrl: string) {
  if (!cloudinarySecureUrl) return ""
  const parts = cloudinarySecureUrl.split("/")
  if (parts.length < 4) return ""
  return parts[3]
}

export function isRegExpString(str: string) {
  try {
    new RegExp(str)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export function formatView(viewCount: number) {
  if (viewCount >= 1000)
    return (viewCount / 1000).toFixed(1).replace(".", ",") + " N"
  else if (viewCount >= 1000000)
    return (
      Math.floor(viewCount / 1000)
        .toFixed(1)
        .replace(".", ",") + " Tr"
    )
  return viewCount
}

export function getRandomViewCount(max = 20000) {
  return Math.floor(Math.random() * max + 5000)
}

export function compareDates(date1: string, date2: string) {
  // Convert the date strings to Date objects
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  // Compare the two dates
  if (d1 < d2) {
    return -1 // date1 is earlier than date2
  } else if (d1 > d2) {
    return 1 // date1 is later than date2
  } else {
    return 0 // dates are equal
  }
}


