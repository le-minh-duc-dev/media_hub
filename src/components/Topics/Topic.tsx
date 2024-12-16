import { TopicType } from "@/types/topics.types"
import TopicsMenu from "./TopicsMenu"
import { GirlType } from "@/types/girls.types"
import GirlsWithTopic from "./GirlsWithTopic"
export default function Topic(
  props: Readonly<{
    topics: TopicType[]
    relatedGirls: GirlType[]
    totalPages: number
    topicParam:string
  }>
) {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-4">
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
