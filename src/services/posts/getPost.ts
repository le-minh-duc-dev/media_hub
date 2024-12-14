import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostSearchParams } from "@/types/posts.types"

const DEFAULT_LIMIT = 1000
const DEFAULT_PAGE = 1
const DEFAULT_SORT = 1 // Ascending

export async function getPost(
  searchParams: PostSearchParams = {},
  isFindOne = false
) {
  // Connect to the database
  await dbConnect()

  // Extract search parameters with default values
  const {
    param,
    girl,
    isPrivate,
    search,
    limit = DEFAULT_LIMIT,
    page = DEFAULT_PAGE,
    sort = DEFAULT_SORT,
  } = searchParams

  // Construct the query object
  let query: Record<string, unknown> = {}
  if (param) query.param = param
  if (girl) query.girl = girl
  if (isPrivate !== undefined) query.isPrivate = isPrivate
  if (search) query = { $text: { $search: search } }

  // Validate and sanitize pagination and sorting
  const validatedLimit = limit > 0 ? limit : DEFAULT_LIMIT
  const validatedPage = page > 0 ? page : DEFAULT_PAGE
  const validatedSort = sort

  // Define the populate configuration
  const populateConfig = {
    path: "girl",
    select: "_id name description",
    populate: {
      path: "topic",
      select: "_id name",
    },
  }

  const postList = !isFindOne
    ? await Post.find(query)
        .sort({ updatedAt: validatedSort })
        .skip((validatedPage - 1) * validatedLimit)
        .limit(validatedLimit)
        .populate(populateConfig)
    : await Post.findOne(query).populate(populateConfig)

  return postList
}
