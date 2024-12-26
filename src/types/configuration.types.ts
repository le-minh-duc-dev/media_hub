import { CloudStorage } from "@/services/media/cloudStorage"
import { ObjectId } from "mongoose"

export type ConfigurationType = {
  _id?: string | ObjectId
  user: string | ObjectId
  cloudStorage: CloudStorage
}
