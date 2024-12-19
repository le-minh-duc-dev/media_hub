import { z } from "zod"

// Schema for TopicType
export const MutateTopicSchema = z.object({
  name: z.string().min(1, "Tên không được bỏ trống"),
  description: z.string().default(""),
  isPrivate: z.boolean().default(false),
})
