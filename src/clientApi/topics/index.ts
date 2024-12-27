import axios from "axios"
export async function checkTopicExists(name: string) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/topics/exists`,
    {
      name,
    }
  )
  return res?.data?.status as boolean
}
