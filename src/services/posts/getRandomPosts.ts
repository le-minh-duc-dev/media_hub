import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostSearchParams } from "@/types/posts.types"

export const GET_RANDOM_POST_TAG = "getRandomPosts"

export async function getRandomPosts(
  searchParams: PostSearchParams = {},
  size = 1
) {
  //connect to database
  await dbConnect()
  const { girl, isPrivate, search } = searchParams

  let query: Record<string, unknown> = {}

  if (girl) query.girl = girl
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { $text: { $search: search } }

  const posts = await Post.aggregate([
    { $match: query }, // Filter criteria
    { $sample: { size } },
    {
      $lookup: {
        from: "girls", // Name of the Girl collection
        localField: "girl", // Field in the Post model
        foreignField: "_id", // Field in the Girl model
        as: "girl", // Output array name
      },
    },
    {
      $unwind: "$girl", // Flatten the girl array to a single document
    },
    {
      $lookup: {
        from: "topics", // Name of the Topic collection
        localField: "girl.topic", // Field in the Girl model
        foreignField: "_id", // Field in the Topic model
        as: "girl.topic", // Output array name
      },
    },
    {
      $unwind: {
        path: "$girl.topic", // Flatten the nested topic array
        preserveNullAndEmptyArrays: true, // Optional: Keep posts even if topic is null
      },
    },
  ])
  return posts
}
