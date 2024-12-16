import { ObjectId } from "mongoose"
import { PostType } from "./posts.types"

export type DailyPost = {
  _id: string | ObjectId
  date: Date
  publicPost: PostType | string
  privatePost: PostType | string
}
