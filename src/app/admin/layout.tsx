import AdminLayout from "@/components/Admin/AdminLayout"
import React, { ReactNode } from "react"

export default function layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
