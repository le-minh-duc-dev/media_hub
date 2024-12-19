import React, { Key } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Image,
  Pagination,
} from "@nextui-org/react"
import { RiEditLine } from "react-icons/ri"
import { GirlType } from "@/types/girls.types"
import { TopicType } from "@/types/topics.types"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { formatDateTime } from "@/lib/utils"
const columns = [
  {
    label: "Girl xinh",
    key: "girl",
  },
  {
    label: "Số lượng bài viết",
    key: "numOfPosts",
  },
  {
    label: "Cấp độ",
    key: "level",
  },
  {
    label: "Ngày tạo",
    key: "createdAt",
  },
  {
    label: "Hành động",
    key: "actions",
  },
]
// const sortableColumns = ["createdAt", "level", "numOfPosts"]
export default function FullTable({
  girls,
  totalPages,
}: Readonly<{
  girls: GirlType[]
  totalPages: number
}>) {
  const searchParams = useSearchParams()
  const page = !isNaN(parseInt(searchParams.get("page") ?? "1"))
    ? parseInt(searchParams.get("page") ?? "1")
    : 1
  const search = searchParams.get("search") ?? ""
  const router = useRouter()
  const renderCell = React.useCallback((girl: GirlType, columnKey: Key) => {
    switch (columnKey) {
      case "girl":
        return (
          <Tooltip
            content={<Image src={girl.url} alt={girl.name} width={300} />}
          >
            <User
              avatarProps={{ radius: "lg", src: girl.url }}
              description={girl.name}
              name={girl.name}
            >
              {(girl.topic as TopicType)?.name}
            </User>
          </Tooltip>
        )
      case "numOfPosts":
        return (
          <div className="flex flex-col ">
            <p className="text-bold text-sm ">{girl.numOfPosts ?? 0}</p>
          </div>
        )
      case "level":
        return (
          <Chip
            className="capitalize"
            color={girl.isPrivate ? "primary" : "default"}
            size="sm"
            variant="flat"
          >
            {girl.isPrivate ? "VIP" : "Public"}
          </Chip>
        )
      case "createdAt":
        return <div className="">{formatDateTime(girl.createdAt!)}</div>
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Cập nhật girl xinh">
              <Link
                href={`/admin/girls/edit/${girl.param}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <RiEditLine />
              </Link>
            </Tooltip>
          </div>
        )
    }
  }, [])

  return (
    <Table
      aria-label="Example static collection table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            initialPage={page}
            onChange={(page) =>
              router.push(`/admin/girls?page=${page}&search=${search}`)
            }
            total={totalPages}
          />
        </div>
      }
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={"No girls to display."} items={girls}>
        {(item) => (
          <TableRow key={item._id?.toString()}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
