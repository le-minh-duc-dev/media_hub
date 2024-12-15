"use client"
import * as React from "react"
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Input,
} from "@nextui-org/react"
import Image from "next/image"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { useTheme } from "next-themes"
import { IoSearchSharp } from "react-icons/io5"
import Links from "./Links"

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
]
export function Navbar() {
  const [isMenuOpen] = React.useState(false)
  const { theme } = useTheme()
  return (
    <NextNavbar shouldHideOnScroll height={100} isBlurred maxWidth="xl">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image
            src={`/assets/images/logo_${
              theme == "dark" ? "white" : "black"
            }_sm_300.png`}
            alt="logo"
            width={60}
            height={60}
            className="hidden md:block"
          />
        </NavbarBrand>
      </NavbarContent>
      <Links />
      <NavbarContent className="sm:hidden ">
        <NavbarBrand className="flex justify-center">
          <Image
            src={`/assets/images/logo_${
              theme == "dark" ? "white" : "black"
            }_sm_300.png`}
            alt="logo"
            width={50}
            height={50}
          />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10 hidden sm:block",
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
        <ThemeSwitcher />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextNavbar>
  )
}
