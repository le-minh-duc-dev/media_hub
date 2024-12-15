import { ObjectId, SortOrder } from "mongoose"
import { UserType } from "./users.types"
import { GirlType } from "./girls.types"
export interface PostSearchParams {
  page?: number
  sort?: SortOrder
  param?: string
  limit?: number
  search?: string
  isPrivate?: boolean
  girl?: string
}
export type PostBodyItem = {
  url: string
  description: string
}
export type PostType = {
  _id: string | ObjectId
  title: string
  param: string
  description: string
  isPrivate: boolean
  body: PostBodyItem[]
  user: string | UserType
  girl: string | GirlType
}
