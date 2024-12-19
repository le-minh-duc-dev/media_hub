import React, { useMemo } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react"
import { GirlType } from "@/types/girls.types"
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
    label: "VIP",
    key: "vip",
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

export default function FullTable({ girls }: { girls: GirlType[] }) {
  const rows = useMemo(() => {
    return girls.map((girl) => ({
      key: girl._id as string,
      girl: girl.name,
      numOfPosts: 5,
      vip: girl.isPrivate ? "*" : "",
      createdAt: formatDateTime(girl.createdAt!),
      actions: "...",
    }))
  }, [girls])
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        )
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        )
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={"No girls to display."}>
        {rows.map((row) => (
          <TableRow key={row.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(row, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
