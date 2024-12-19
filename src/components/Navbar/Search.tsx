import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react"

import React from "react"
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
        {(titleProps) => (
          <div className="px-2 py-3 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Tìm kiếm bài viết, girl xinh
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[15rem] h-10 hidden sm:block",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Type to search..."
                size="sm"
                startContent={<IoSearchSharp />}
                type="search"
              />
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
