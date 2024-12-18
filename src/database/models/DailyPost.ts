import { populateConfig } from "@/services/posts/config"
import mongoose from "mongoose"
const { Schema } = mongoose

const dailyPostSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },

    privatePost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    publicPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)


dailyPostSchema.index({ date: 1 }, { unique: true })



const populate = {
  ...populateConfig,
}
dailyPostSchema.pre("find", function () {
  this.populate({
    path: "privatePost",
    populate,
  }).populate({
    path: "publicPost",
    populate,
  })
})
dailyPostSchema.pre("findOne", function () {
  this.populate({
    path: "privatePost",
    populate,
  }).populate({
    path: "publicPost",
    populate,
  })
})

export default mongoose.models.DailyPost ||
  mongoose.model("DailyPost", dailyPostSchema)
