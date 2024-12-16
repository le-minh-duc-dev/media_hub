import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function getData(url: string) {
  const res = await fetch(url)
  const data = await res.json()
  return data
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

export function extractIframeContent(html: string) {
  // Define the regular expression to match the content inside <iframe>...</iframe>
  const regex = /<iframe[^>]*>.*?<\/iframe>/

  // Use the regex to find the match
  const match = html.match(regex)

  // If a match is found, return the iframe content
  if (match) {
    return match[0]
  }

  // If no match is found, return an empty string or a message indicating no iframe found
  return ""
}

export function normalizeHTMLString(htmlString: string) {
  // Replace encoded characters with their corresponding symbols
  const normalizedHTML = htmlString
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")

  return normalizedHTML
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

export function compareTags(tagA: string, tagB: string) {
  // console.log("tagA", tagA, "tagB", tagB)
  if (tagA) tagA = tagA.toLowerCase()
  if (tagB) tagB = tagB.toLowerCase()
  return (tagA && tagA.includes(tagB)) || (tagB && tagB.includes(tagA))
}

// export async function getPayloadFromToken(token) {
//   try {
//     const { payload, protectedHeader } = await jose.jwtVerify(
//       token,
//       new TextEncoder().encode(process.env.SECRET_JWT_KEY)
//     )

//     return payload
//   } catch (error) {
//     return null
//   }
// }

export function convertUpdatedPostValuesToFormData(id: string, values) {
  const formData = new FormData()
  formData.append("id", id)
  formData.append("title", values.title)
  formData.append("girl", values.girl)
  formData.append("description", values.description)
  formData.append("view", values.view)
  formData.append("isPrivate", values.isPrivate)
  formData.append("deletedUrlList", JSON.stringify(values.deletedUrlList))
  formData.append("bodyLength", values.body.length)
  values.body.forEach((element, index) => {
    formData.append(`description-${index}`, element.description)
    formData.append(`url-${index}`, element.url)
  })
  return formData
}

export function convertFormDataToUpdatedPostValues(formData) {
  const values = {
    id: formData.get("id"),
    title: formData.get("title"),
    girl: formData.get("girl"),
    description: formData.get("description"),
    view: formData.get("view"),
    isPrivate: formData.get("isPrivate"),
    deletedUrlList: JSON.parse(formData.get("deletedUrlList")),
    body: [],
  }
  const bodyLength = formData.get("bodyLength")
  for (let index = 0; index < bodyLength; index++) {
    values.body.push({
      description: formData.get(`description-${index}`),
      url: formData.get(`url-${index}`),
    })
  }
  return values
}

// for creating post
export function convertNewPostValuesToFormData(values) {
  const formData = new FormData()

  formData.append("title", values.title)
  formData.append("girl", values.girl)

  formData.append("description", values.description)

  formData.append("view", values.view)
  formData.append("isPrivate", values.isPrivate)

  formData.append("bodyLength", values.body.length)
  values.body.forEach((element, index) => {
    formData.append(`url-${index}`, element.url)
    formData.append(`description-${index}`, element.description)
  })
  return formData
}

export function convertFormDataToNewPostValues(formData) {
  const values = {
    title: formData.get("title") || "",
    description: formData.get("description") || "",
    girl: formData.get("girl") || "",

    view: formData.get("view") || 0,
    isPrivate: formData.get("isPrivate") == "true",
    bodyLength: formData.get("bodyLength") || 0,
    body: [],
  }
  const bodyLength = formData.get("bodyLength")
  for (let index = 0; index < bodyLength; index++) {
    values.body.push({
      url: formData.get(`url-${index}`),
      description: formData.get(`description-${index}`),
    })
  }
  return values
}
//
export function convertFlatValuesToFormData(values) {
  const formData = new FormData()
  formData.append("fields", JSON.stringify(Object.keys(values)))
  Object.keys(values).forEach((key) => formData.append(key, values[key]))
  return formData
}

export function convertFormDataToFlatValues(formData) {
  const values = {}
  try {
    const fields = JSON.parse(formData.get("fields"))
    fields.forEach((field) => {
      values[field] = formData.get(field)
    })
  } catch (error) {
    values.error = error.toString()
  } finally {
    return values
  }
}

export function formatToRightParams(param) {
  var decodedParam = decodeURIComponent(param)
  var replacedParam = decodedParam.replace(/ /g, "+")
  return replacedParam
}

export function formatYearMonthDay(dateString) {
  try {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Adding 1 to get the correct month (January is 0)
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  } catch (err) {
    return ""
  }
}

export function isRegExpString(str:string) {
  try {
    new RegExp(str)
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}

export function formatView(viewCount:number) {
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

export function toggleTheme() {
  const currentTheme = localStorage.getItem("theme")
  console.log(currentTheme)
  // Whenever the user explicitly chooses light mode
  if (!currentTheme || currentTheme == "light") {
    localStorage.setItem("theme", "dark")
    document.documentElement.classList.add("dark")
    return
  }
  localStorage.setItem("theme", "light")
  document.documentElement.classList.remove("dark")
}
export function setThemeAuto() {
  if (
    localStorage.getItem("theme") === "light" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: light)").matches)
  ) {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }
}
export function getRandomViewCount(max = 20000) {
  return Math.floor(Math.random() * max + 5000)
}
