import mongoose from "mongoose"
const { Schema } = mongoose

const girlSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String },
    param: { type: String, unique: true, index: true },
    description: { type: String },
    url: String,
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    isPrivate: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)
girlSchema.index({ name: "text", description: "text" })
export default mongoose.models.Girl || mongoose.model("Girl", girlSchema)
