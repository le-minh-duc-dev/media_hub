import { useState, useEffect, useRef } from "react"

const useScrollingDown = (threshold:number =100) => {
  const [isScrollingDown, setIsScrollingDown] = useState(true)
  const lastScrollY = useRef(0)
  const isScrollingDownTrackingRef = useRef(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current ||currentScrollY<threshold) {
        if (isScrollingDownTrackingRef.current) {
          setIsScrollingDown(false)
          isScrollingDownTrackingRef.current = false
        }
      } else {
        if (!isScrollingDownTrackingRef.current) {
          setIsScrollingDown(true)
          isScrollingDownTrackingRef.current = true
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return isScrollingDown
}

export default useScrollingDown
