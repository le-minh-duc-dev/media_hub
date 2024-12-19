import { ObjectId } from "mongoose"
import { UserType } from "./users.types"
import { TopicType } from "./topics.types"
export interface GirlSearchParams {
  page?: number
  sort_created?: 1|-1
  sort_updated?: 1|-1
  sort_level?: 1|-1
  param?: string
  limit?: number
  search?: string
  isPrivate?: boolean
  topic?: string
}
export type GirlType = {
  _id?: string | ObjectId 
  name: string
  param: string
  description: string
  isPrivate: boolean
  url: string
  user: string | UserType
  topic: string | TopicType
  createdAt?:string,
  numOfPosts?:number
}
