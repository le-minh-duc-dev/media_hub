
import { getPost } from "@/services/posts";

export default async function Home() {
  const topics = await getPost()
  console.log(topics);
  return <h1>Hello world!</h1>
}
