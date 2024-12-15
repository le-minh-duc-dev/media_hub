import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Card,
  Image,
  CardHeader,
  Tooltip,
} from "@nextui-org/react"
import { useContext, useMemo, useState } from "react"
import { NavbarContext } from "./Navbar"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { GirlType } from "@/types/girls.types"
import { TopicType } from "@/types/topics.types"
import GirlItem from "../Topics/GirlItem"
import Link from "next/link"
export default function Category({
  topicFilterFn,
  categoryName,
}: Readonly<{
  topicFilterFn: (topics: TopicType[]) => TopicType[]
  categoryName: string
}>) {
  const { topics, girls } = useContext(NavbarContext)
  const artistTopics = useMemo(
    () => topicFilterFn(topics),
    [topics, topicFilterFn]
  )
  const girlsPerTopic = useMemo(() => {
    const result: Record<string, GirlType[]> = {}
    artistTopics.forEach((topic) => {
      result[topic._id as string] = girls.filter(
        (girl) => (girl.topic as TopicType)._id == topic._id
      )
      result[topic._id as string] = result[topic._id as string].slice(0, 5)
    })

    return result
  }, [artistTopics, girls])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      showArrow
    >
      <PopoverTrigger>
        <Button
          disableRipple
          className="p-0 bg-transparent  data-[hover=true]:bg-transparent font-semibold text-base "
          endContent={isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          variant="light"
        >
          {categoryName}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className=" md:max-w-[75vw]  p-3 gap-x-4 h-[50vh] ">
          {/* <div className="flex flex-col">
            <h3 className="text-center">Thể loại</h3>
            <Divider className="my-2"/>
            {topics.map((topic) => (
              <Button radius="sm" variant="light" key={topic._id as string}>
                {topic.name}
              </Button>
            ))}
          </div>
          <div className="col-span-3">

          </div> */}

          <div className="flex gap-x-4">
            {artistTopics.map((topic) => (
              <div key={topic._id as string} className="flex-1">
                <Link
                  href={`/topics/${topic.param}`}
                  className="font-semibold hover:underline cursor-pointer mb-4 block"
                >
                  {topic.name}
                </Link>
                <ul className="flex flex-col gap-4 ">
                  {girlsPerTopic[topic._id as string].map((girl) => (
                    <NavGirlItem key={girl._id as string} girl={girl} closePopover={()=>setIsOpen(false)}/>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
function NavGirlItem({ girl,closePopover }: Readonly<{ girl: GirlType,closePopover:()=>void }>) {
  return (
    <Link href={`/girls/${girl.param}`} onClick={closePopover}>
      <Tooltip content={<GirlItem girl={girl} />} delay={500}>
        <Card className="w-[200] hover:bg-content1 cursor-pointer bg-content2">
          <CardHeader className="flex gap-3">
            <Image
              alt={girl.name}
              className="object-cover"
              height={40}
              radius="sm"
              src={girl.url}
              width={40}
            />
            <div className="flex flex-col shrink">
              <p className="text-md font-semibold">{girl.name}</p>
              {/* <div  className="text-small text-default-500 line-clamp-1" dangerouslySetInnerHTML={{__html:girl.description}}/> */}
            </div>
          </CardHeader>
        </Card>
      </Tooltip>
    </Link>
  )
}
