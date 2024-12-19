import { z } from "zod"

// Schema for GirlType
export const MutateGirlSchema = z.object({
  name: z.string().min(1, "Tên không được bỏ trống"),
  description: z.string().default(""),
  isPrivate: z.boolean().default(false),
  topic: z.string().length(24),
  url: z.string().default(""),
})

// Schema for GirlType
export const MutateGirlSchemaOnServer = MutateGirlSchema.extend({
  url: z.string().min(1, "Url không được bỏ trống"),
})
