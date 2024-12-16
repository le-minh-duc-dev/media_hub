import Girl from "@/database/models/Girl"
import Topic from "@/database/models/Topic"
export const populateConfig = {
  path: "girl",
  select: "_id name description param",
  model: Girl,
  populate: {
    path: "topic",
    select: "_id name param",
    model: Topic,
  },
}
