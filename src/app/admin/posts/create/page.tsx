import { protectUpdateContentPage } from "@/authentication/protect"

export default async function Page() {
  await protectUpdateContentPage()
  return <div className="">create posts</div>
}
