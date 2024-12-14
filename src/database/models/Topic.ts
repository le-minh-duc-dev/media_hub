import mongoose from "mongoose"
const { Schema } = mongoose

const topicSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
    name: { type: String, index: true, unique: true },
    param: { type: String },
    description: { type: String, index: true },
    isPrivate: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)
export default mongoose.models.Topic || mongoose.model("Topic", topicSchema)
