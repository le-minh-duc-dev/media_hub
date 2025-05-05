"use client"
import * as React from "react"
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  Button,
  Divider,
} from "@nextui-org/react"
import dynamic from "next/dynamic"
const Image = dynamic(() => import("next/image"), { ssr: false })
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { useTheme } from "next-themes"
import { IoSettingsSharp } from "react-icons/io5"
import Links from "./Links"

import { NavbarContextType, NavbarProps } from "@/types/navbar.types"
import { TopicType } from "@/types/topics.types"
import { GirlType } from "@/types/girls.types"
import { useSession } from "next-auth/react"
import { SignOut } from "../SignOut"
import Search from "./Search"
import { useRouter } from "next/navigation"
import Link from "next/link"
export const NavbarContext = React.createContext<NavbarContextType>({
  topics: [],
  girls: [],
})
export function Navbar(props: Readonly<NavbarProps>) {
  const { data: session } = useSession()
  const router = useRouter()
  const isLogined = session?.user != null
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { theme } = useTheme()
  const contextValues = React.useMemo(
    () => ({
      topics: JSON.parse(props.topics) as TopicType[],
      girls: JSON.parse(props.girls) as GirlType[],
    }),
    [props]
  )
  return (
    <NavbarContext.Provider value={contextValues}>
      <NextNavbar
        shouldHideOnScroll
        height={100}
        isBlurred
        maxWidth="xl"
        className="bg-content2"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
          />
          <NavbarBrand>
            <Link href="/" className="font-bold text-lg ">
              Media Hub
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <Links />
        <NavbarContent className="lg:hidden ">
          <NavbarBrand className="flex justify-center">
            <Link href="/">
              <Image
                src={`/assets/images/logo_${
                  theme?.includes("dark") ? "white" : "black"
                }_sm_300.png`}
                alt="logo"
                width={50}
                height={50}
                // suppressHydrationWarning
              />{" "}
            </Link>
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
          <Search />
          <div className="hidden lg:block">
            <ThemeSwitcher />
          </div>
          {isLogined && (
            <Button
              variant="light"
              className="hidden lg:flex"
              isIconOnly
              onPress={() => {
                router.push("/admin")
              }}
            >
              <IoSettingsSharp className="text-lg" />
            </Button>
          )}
          <div className="hidden lg:block">
            {isLogined ? (
              <SignOut />
            ) : (
              <Link href="/login" className="underline text-foreground-50">
                Login
              </Link>
            )}
          </div>
        </NavbarContent>
        <NavbarMenu>
          <Link
            className="w-full py-2"
            href={`/posts`}
            onClick={() => {
              setIsMenuOpen(false)
            }}
          >
            Tất cả bài viết
          </Link>
          <Divider className="mb-2" />
          <h5 className="font-bold text-lg">Chủ đề</h5>
          {contextValues.topics.map((item) => (
            <Link
              className="w-full py-2"
              href={`/topics/${item.param}`}
              key={item._id as string}
              onClick={() => {
                setIsMenuOpen(false)
              }}
            >
              {item.name}
            </Link>
          ))}
          <Divider className="my-6" />
          <div className="flex gap-x-4">
            <ThemeSwitcher />
            <Button
              variant="light"
              isIconOnly
              onPress={() => {
                setIsMenuOpen(false)
                router.push("/admin")
              }}
            >
              <IoSettingsSharp className="text-lg" />
            </Button>
            {isLogined ? (
              <SignOut />
            ) : (
              <Link
                href="/login"
                className="underline text-foreground-50"
                onClick={() => {
                  setIsMenuOpen(false)
                }}
              >
                Login
              </Link>
            )}
          </div>
        </NavbarMenu>
      </NextNavbar>
    </NavbarContext.Provider>
  )
}
