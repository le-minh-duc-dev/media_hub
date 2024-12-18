import { ObjectId } from "mongoose"
import { PostType } from "./posts.types"

export type DailyPost = {
  _id: string | ObjectId
  date: Date
  publicPost: PostType | string
  privatePost: PostType | string
}
export type SearchDate = {
  date: number
  month: number
  year: number
}
