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
export const EditPostSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được bỏ trống"),
  description: z.string().default(""),
  isPrivate: z.boolean().default(false),
  body: z.array(PostBodyItemSchema),
  girl: z.string().length(24),
  view: z.number().int().nonnegative(),
})

const PostBodyItemSchemaOnServer = z.object({
  url: z.string().url(), 
  description: z.string().optional(),
})

// Schema for PostType
export const EditPostSchemaOnServer = EditPostSchema.extend({
  body: z.array(PostBodyItemSchemaOnServer),
})

