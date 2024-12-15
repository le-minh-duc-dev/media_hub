// app/components/ThemeSwitcher.tsx
"use client"

import { Button } from "@nextui-org/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FaMoon } from "react-icons/fa"
import { TbSunHigh } from "react-icons/tb"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme?.includes("dark")
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <div>
      <Button
        isIconOnly
        aria-label="Theme toggle"
        color="default"
        variant="light"
        className={isDarkMode ? "" : "text-xl"}
        onPress={() =>
          setTheme((pre) => (pre.includes("light") ? "dark" : "light"))
        }
      >
        {theme?.includes("dark") ? <FaMoon /> : <TbSunHigh />}
      </Button>
    </div>
  )
}
