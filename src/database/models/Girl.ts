import mongoose from "mongoose"
const { Schema } = mongoose



const girlSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    name: { type: String, index: true },
    param: { type: String },
    description: { type: String, index: true },
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

export default mongoose.models.Girl || mongoose.model("Girl", girlSchema)
