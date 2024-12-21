"use client" // Error boundaries must be Client Components

import { Button } from "@nextui-org/react"
import { useEffect } from "react"
export default function PageError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mt-12">
      <h1 className="text-xl font-bold mb-4">Có lỗi xảy ra!</h1>
      <Button onPress={() => reset()} variant="flat">Thử lại</Button>
    </div>
  )
}
