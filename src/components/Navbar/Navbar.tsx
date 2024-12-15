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
import dynamic from 'next/dynamic'
const Image = dynamic(() => import('next/image'), { ssr: false })
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { useTheme } from "next-themes"
import { IoSearchSharp } from "react-icons/io5"
import Links from "./Links"

import { NavbarContextType, NavbarProps } from "@/types/navbar.types"
import { TopicType } from "@/types/topics.types"
import { GirlType } from "@/types/girls.types"
export const NavbarContext = React.createContext<NavbarContextType>({
  topics: [],
  girls: [],
})
export function Navbar(props: Readonly<NavbarProps>) {
  const [isMenuOpen] = React.useState(false)
  const { theme } = useTheme()
  const contextValues = React.useMemo(
    () => ({
      topics: JSON.parse(props.topics) as TopicType[],
      girls: JSON.parse(props.girls) as GirlType[],
    }),
    [props]
  )
  return (
    <NavbarContext.Provider value={contextValues} >
      <NextNavbar
        shouldHideOnScroll
        height={100}
        isBlurred
        maxWidth="xl"
        className="bg-content2"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Image
              src={`/assets/images/logo_${
                theme?.includes("dark") ? "white" : "black"
              }_sm_300.png`}
              alt="logo"
              width={60}
              height={60}
              className="hidden md:block"
              // suppressHydrationWarning
            />
          </NavbarBrand>
        </NavbarContent>
        <Links />
        <NavbarContent className="sm:hidden ">
          <NavbarBrand className="flex justify-center">
            <Image
              src={`/assets/images/logo_${
                theme?.includes("dark") ? "white" : "black"
              }_sm_300.png`}
              alt="logo"
              width={50}
              height={50}
              // suppressHydrationWarning
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
          {contextValues.topics.map((item) => (
            <NavbarMenuItem key={item._id as string}>
              <Link className="w-full" href={`/topics/${item.param}`} size="lg">
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextNavbar>
    </NavbarContext.Provider>
  )
}
