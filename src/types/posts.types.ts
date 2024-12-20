import { ObjectId } from "mongoose"
import { UserType } from "./users.types"
import { GirlType } from "./girls.types"
export interface PostSearchParams {
  sort_created?: 1 | -1
  sort_updated?: 1 | -1
  sort_level?: 1 | -1
  sort_views?: 1 | -1
  page?: number
  param?: string
  limit?: number
  search?: string
  isPrivate?: boolean
  girl?: string
}

export type PostBodyItem = {
  url: string
  description?: string
  file?: File
  id?: string
}
export interface PostType {
  _id?: string | ObjectId
  title: string
  param: string
  description: string
  isPrivate: boolean
  body: PostBodyItem[]
  user: string | UserType
  girl: string | GirlType
  updatedAt?: string
  createdAt?: string
  view: number
}
