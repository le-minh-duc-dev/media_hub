import { Button, Input } from "@nextui-org/react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import React from "react"
import { IoSearchSharp } from "react-icons/io5"

export default function TableSearch({
  onSearch,
  inputSearch,
  setInputSearch,
  router,
  createButtonName,
  createPageLink,
}: Readonly<{
  onSearch: (clear?: boolean) => void
  inputSearch: string
  setInputSearch: React.Dispatch<React.SetStateAction<string>>
  router: AppRouterInstance
  createButtonName: string
  createPageLink: string
}>) {
  return (
    <div className="flex justify-between gap-3 items-end my-4">
      <form
        className="flex gap-x-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSearch()
        }}
      >
        <Input
          className="w-64"
          placeholder="Search by name..."
          startContent={<IoSearchSharp />}
          value={inputSearch}
          onValueChange={(value) => {
            setInputSearch(value)
            if (value == "") {
              onSearch(true)
            }
          }}
        />
        <Button type="submit">Tìm kiếm</Button>
      </form>

      <Button
        color="primary"
        onPress={() => {
          router.push(createPageLink)
        }}
      >
        {createButtonName}
      </Button>
    </div>
  )
}
