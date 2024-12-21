"use client"

import PageError from "@/components/PageError"

export default function PostError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  return <PageError error={error} reset={reset} />
}
