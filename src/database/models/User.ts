import mongoose from "mongoose"
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: { type: String },
    url: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, default:"" },
    role: { type: String, required: true, default: "user" },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models?.User || mongoose.model("User", userSchema)
