import mongoose from "mongoose"
const { Schema } = mongoose
const postItem = new Schema({
  url: String,
  description: { type: String, index: true ,default:""},
})

postItem.index({ description: "text" })

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String },
    description: { type: String },
    param: { type: String, index: true, unique: true },
    girl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Girl",
      required: true,
    },

    body: [postItem],
    isPrivate: { type: Boolean, default: false },
    view: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)
postSchema.index({ title: "text", description: "text" })
export default mongoose.models.Post || mongoose.model("Post", postSchema)
