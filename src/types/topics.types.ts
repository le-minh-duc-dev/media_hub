import { ObjectId, SortOrder } from "mongoose"
import { UserType } from "./users.types"
export interface TopicSearchParams {
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
}
