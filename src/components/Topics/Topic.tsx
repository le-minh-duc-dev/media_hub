import { TopicType } from "@/types/topics.types"
import TopicsMenu from "./TopicsMenu"
import { GirlType } from "@/types/girls.types"
import GirlsWithTopic from "./GirlsWithTopic"
import TopicBreadcrumbs from "./TopicBreadcrumbs"
import { SearchTopics } from "./SearchTopics"

export default function Topic(
  props: Readonly<{
    topics: TopicType[]
    relatedGirls: GirlType[]
    totalPages: number
    topicParam: string
  }>
) {
  return (
    <div className="mt-12">
      <TopicBreadcrumbs topics={JSON.stringify(props.topics)} />
      <div className="grid md:grid-cols-4 mt-12 gap-4">
        <TopicsMenu topics={JSON.stringify(props.topics)} />
        <div className="md:col-span-3">
          <div className="">
            <SearchTopics />
          </div>
          <GirlsWithTopic
            girls={JSON.stringify(props.relatedGirls)}
            totalPages={props.totalPages}
            topicParam={props.topicParam}
          />
        </div>
      </div>
    </div>
  )
}
