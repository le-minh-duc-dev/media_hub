import { TopicType } from "@/types/topics.types"
import TopicsMenu from "./TopicsMenu"
import { GirlType } from "@/types/girls.types"
import GirlsWithTopic from "./GirlsWithTopic"
import TopicBreadcrumbs from "./TopicBreadcrumbs"

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
      <div className="grid grid-cols-4 mt-12">
        <TopicsMenu topics={JSON.stringify(props.topics)} />
        <div className="col-span-3">
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
