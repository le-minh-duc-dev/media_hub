import { ObjectId } from "mongoose"

export type UserType = {
    _id:string |ObjectId
    name:string,
    email:string,
    password?:string,
    role:string,
    url:string
}