import { populateConfig } from "@/services/posts/config"
import mongoose from "mongoose"
const { Schema } = mongoose

const dailyPostSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
      validate: {
        validator: function (value: Date) {
          return value <= new Date()
        },
        message: "Date cannot be in the future.",
      },
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

// Indexing for optimized query performance
dailyPostSchema.index({ date: 1 }, { unique: true }) // Ensures no duplicate records for the same date

// Middleware: Populates posts when fetching DailyPost documents

const populate = {
  ...populateConfig
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
