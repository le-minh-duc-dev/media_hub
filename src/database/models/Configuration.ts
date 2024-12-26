import { CloudStorage } from "@/services/media/cloudStorage"
import mongoose from "mongoose"
const { Schema } = mongoose

const configurationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique:true
    },
    cloudStorage: {
      type: String,
      default: CloudStorage.default,
      enum: Object.values(CloudStorage),
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Configuration ||
  mongoose.model("Configuration", configurationSchema)
