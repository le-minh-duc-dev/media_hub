import { SortOrder } from "mongoose"
export interface TopicSearchParams {
  page?: number
  sort?: SortOrder
  param?: string
  limit?: number
  search?: string
  isPrivate?: boolean
}
