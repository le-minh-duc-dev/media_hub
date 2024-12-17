import { protectUpdateContentPage } from "@/authentication/protect"
import EditPost from "@/components/Posts/EditPost/EditPost"
import { getGirl } from "@/services/girls"
import { GirlType } from "@/types/girls.types"

export default async function Page() {
  await protectUpdateContentPage()
  const girls: GirlType[] = await getGirl()

  return <EditPost girls={JSON.stringify(girls)} />
}
