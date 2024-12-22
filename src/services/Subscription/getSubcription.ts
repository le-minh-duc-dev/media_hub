import { Subscription } from "@/database/models/Subscription"
import { unstable_cache } from "next/cache"

export const GET_SUBSCRIPTION_TAG = "GET_SUBSCRIPTION_TAG"
export const getSubscription = unstable_cache(
  getSubscriptionNoCache,
  ["getSubscription"],
  { tags: [GET_SUBSCRIPTION_TAG] }
)

export async function getSubscriptionNoCache(
  searchParams?: { endpoint?: string },
  isFindOne: boolean = false
) {
  const subscriptions = await Subscription.find(searchParams??{})
  if (isFindOne) return subscriptions.length > 0 ? subscriptions[0] : null
  else return subscriptions
}
