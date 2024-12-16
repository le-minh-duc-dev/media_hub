import { useCallback } from "react"

const useScrollY = () => {
  const scrollToY = useCallback((yPosition: number = 0) => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: yPosition,
        behavior: "smooth",
      })
    }
  }, [])

  return scrollToY
}

export default useScrollY
