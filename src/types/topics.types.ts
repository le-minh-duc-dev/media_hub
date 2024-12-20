import { ObjectId, SortOrder } from "mongoose"
import { UserType } from "./users.types"
export interface TopicSearchParams {
  sort_created?: 1 | -1
  sort_updated?: 1 | -1
  sort_level?: 1 | -1
  page?: number
  sort?: SortOrder
  param?: string
  limit?: number
  search?: string
  isPrivate?: boolean
}

export type TopicType = {
  _id?: string | ObjectId
  name: string
  param: string
  description: string
  isPrivate: boolean
  user: string | UserType
  numOfGirls?: number
  createdAt?: string
}
