import { revalidateTag } from "next/cache"
import { GET_TOPIC_TAG } from "./getTopic"
import { COUNT_TOPIC_LIST_TAG } from "./countTopicList"

export function revalidateTopicTags() {
  revalidateTag(GET_TOPIC_TAG)
  revalidateTag(COUNT_TOPIC_LIST_TAG)
}
