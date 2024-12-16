"use client"
import { Button } from "@nextui-org/react"
import { signOut } from "next-auth/react"
import { PiSignOut } from "react-icons/pi"

export function SignOut() {
  return (
    <Button isIconOnly onPress={() => signOut()} variant="light">
      <PiSignOut className="text-xl"/>
    </Button>
  )
}
