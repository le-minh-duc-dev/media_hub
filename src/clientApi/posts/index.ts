import axios from "axios"
export async function checkPostExists(title: string) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/exists`,
    {
      title,
    }
  )
  return res?.data?.status as boolean
}
