import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

export default function Links() {
  const [dropDownOpen, setDropDownOpen] = useState(false)
  return (
    <NavbarContent className="hidden sm:flex gap-12" justify="center">
      <NavbarItem>
        <Link color="foreground" className="font-semibold" href="#">
          Mới nhất
        </Link>
      </NavbarItem>
      <Dropdown
        closeOnSelect
        onOpenChange={() => {
          setDropDownOpen(true)
        }}
        onClose={() => {
          setDropDownOpen(false)
        }}
      >
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent font-semibold text-base"
              endContent={dropDownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              variant="light"
            >
              Nghệ sĩ nổi tiếng
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="ACME features"
          className="w-[340px]"
          itemClasses={{
            base: "gap-4",
          }}
        >
          <DropdownItem
            key="autoscaling"
            description="ACME scales apps to meet user demand, automagically, based on load."
          >
            Autoscaling
          </DropdownItem>
          <DropdownItem
            key="usage_metrics"
            description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
          >
            Usage Metrics
          </DropdownItem>
          <DropdownItem
            key="production_ready"
            description="ACME runs on ACME, join us and others serving requests at web scale."
          >
            Production Ready
          </DropdownItem>
          <DropdownItem
            key="99_uptime"
            description="Applications stay on the grid with high availability and high uptime guarantees."
          >
            +99% Uptime
          </DropdownItem>
          <DropdownItem
            key="supreme_support"
            description="Overcome any challenge with a supporting team ready to respond."
          >
            +Supreme Support
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <NavbarItem>
        <Link color="foreground" className="font-semibold" href="#">
          Mạng xã hội
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" className="font-semibold" href="#">
          Hot girls
        </Link>
      </NavbarItem>
    </NavbarContent>
  )
}
