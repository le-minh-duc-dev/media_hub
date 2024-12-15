import { Link, NavbarContent, NavbarItem } from "@nextui-org/react"
import Category from "./Category"
import { hotGirlTopics, socialTopics } from "./categories"

export default function Links() {
  return (
    <NavbarContent className="hidden sm:flex gap-12" justify="center">
      <NavbarItem>
        <Link color="foreground" className="font-semibold" href="/posts">
          Mới nhất
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Category
          categoryName="Nghệ sĩ nổi tiếng"
          topicFilterFn={(topics) =>
            topics.filter(
              (topic) =>
                !socialTopics.includes(topic.name.toLowerCase()) &&
                !hotGirlTopics.includes(topic.name.toLowerCase())
            )
          }
        />
      </NavbarItem>

      <NavbarItem>
        <Category
          categoryName="Mạng xã hội"
          topicFilterFn={(topics) =>
            topics.filter((topic) =>
              socialTopics.includes(topic.name.toLowerCase())
            )
          }
        />
      </NavbarItem>
      <NavbarItem>
        <Category
          categoryName="Hot girls"
          topicFilterFn={(topics) =>
            topics.filter((topic) =>
              hotGirlTopics.includes(topic.name.toLowerCase())
            )
          }
        />
      </NavbarItem>
    </NavbarContent>
  )
}
