import { GirlType } from "./girls.types"
import { TopicType } from "./topics.types"

export type NavbarContextType = {
  topics: TopicType[]
  girls: GirlType[]
}
export type NavbarProps = {
  topics: string
  girls: string
}
