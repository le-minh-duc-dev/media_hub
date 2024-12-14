import { SortOrder } from "mongoose"
export interface GirlSearchParams {
  page?: number
  sort?: SortOrder
  param?: string
  limit?: number
  search?: string
  isPrivate?: boolean
  topic?: string
}
