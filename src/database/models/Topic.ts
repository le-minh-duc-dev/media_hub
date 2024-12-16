import mongoose from "mongoose"
const { Schema } = mongoose

const topicSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, unique: true },
    param: { type: String, index: true, unique:true },
    description: { type: String },
    isPrivate: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)
topicSchema.index({ name: "text", description: "text" })

export default mongoose.models.Topic || mongoose.model("Topic", topicSchema)
