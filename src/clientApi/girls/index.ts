import axios from "axios"
export async function checkGirlExists(name: string) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/girls/exists`,
    {
      name,
    }
  )
  return res?.data?.status as boolean
}
