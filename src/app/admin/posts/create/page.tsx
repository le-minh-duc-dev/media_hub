import { protectUpdateContentPage } from "@/authentication/protect"
import CreatePost from "@/components/Posts/Mutation/CreatePost"
import { getGirl } from "@/services/girls"
import { GirlType } from "@/types/girls.types"

export default async function Page() {
  await protectUpdateContentPage()
  const girls: GirlType[] = await getGirl()

  return <CreatePost girls={JSON.stringify(girls)} />
}
