"use client"
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import React from "react"

export default function PostBreadcrumbsFake() {
  return (
    <Breadcrumbs className="opacity-0">
      <BreadcrumbItem href="/">fake</BreadcrumbItem>
    </Breadcrumbs>
  )
}
