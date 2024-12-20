import { revalidateTag } from "next/cache"
import { COUNT_POST_LIST_TAG } from "./countPostList"
import { GET_POST_TAG } from "./getPost"

export function revalidatePostTags() {
  revalidateTag(GET_POST_TAG)
  revalidateTag(COUNT_POST_LIST_TAG)
}
