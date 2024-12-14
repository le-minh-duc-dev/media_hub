import { SortOrder } from "mongoose";
export interface PostSearchParams  {
  page?: number
  sort?: SortOrder
  param?:string
  limit?:number
  search?:string
  isPrivate?:boolean
  girl?:string
}
