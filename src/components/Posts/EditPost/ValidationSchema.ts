import { z } from "zod"

// Schema for PostBodyItem
const PostBodyItemSchema = z.object({
  url: z.string().url().optional(), // URL must be a valid URL
  description: z.string().optional(), // Optional description
  file: z
    .instanceof(File) // File must be a File instance if provided
    .optional(),
  id: z.string().optional(), // Optional string ID
})

// Schema for PostType
const ValidationSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được bỏ trống"),
  description: z.string(),
  isPrivate: z.boolean(),
  body: z.array(PostBodyItemSchema),
  girl: z.string().length(24),
  view: z.number().int().nonnegative(),
})

export { PostBodyItemSchema, ValidationSchema }
