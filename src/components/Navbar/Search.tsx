import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
} from "@nextui-org/react"
import { useRouter } from "next/navigation"

import React, { useState } from "react"
import { IoSearchSharp } from "react-icons/io5"

export default function Search() {
  return (
    <Popover showArrow offset={10} placement="bottom">
      <PopoverTrigger>
        <Button variant="light" isIconOnly>
          <IoSearchSharp className="text-lg" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px]">
        <div className="px-2 py-3 w-full">
          <Tabs aria-label="Options">
            <Tab key="posts" title="Bài viết">
              <Form placeholder="Tìm kiếm bài viết" url="/posts" />
            </Tab>
            <Tab key="girls" title="Girl xinh">
              <Form placeholder="Tìm kiếm girl xinh" url="/topics" />
            </Tab>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}
function Form({
  placeholder,
  url,
}: Readonly<{ placeholder: string; url: string }>) {
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()
  function onSearch(clear: boolean = false) {
    router.push(`${url}?search=${clear ? "" : inputValue}`)
  }
  return (
    <form
      className="mt-2 flex flex-col gap-2 w-full"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch()
      }}
    >
      <Input
        value={inputValue}
        onValueChange={(value) => {
          setInputValue(value)
          if (value == "") {
            onSearch(true)
          }
        }}
        classNames={{
          base: "max-w-full sm:max-w-[15rem] h-10 ",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder={placeholder}
        size="sm"
        startContent={<IoSearchSharp />}
        type="text"
      />
    </form>
  )
}
