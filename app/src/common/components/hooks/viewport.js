import { useEffect, useState } from "react";

export const useViewport = () => {
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const setResponsiveness = () => window.innerWidth < 900
        ? setIsMobileView(true)
        : setIsMobileView(false)
    setResponsiveness()
    window.addEventListener('resize', () => setResponsiveness())
    return () => {
      window.removeEventListener('resize', () => setResponsiveness())
    }
  }, [])

  return isMobileView
}

export default useViewport;