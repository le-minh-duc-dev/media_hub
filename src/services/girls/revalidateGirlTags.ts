import { revalidateTag } from "next/cache"
import { COUNT_GIRL_LIST_TAG } from "./countGirlList"
import { GET_GIRL_TAG } from "./getGirl"

export function revalidateGirlTags() {
  revalidateTag(GET_GIRL_TAG)
  revalidateTag(COUNT_GIRL_LIST_TAG)
}
