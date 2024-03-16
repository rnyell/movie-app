import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export default function RootLayout() {
  useEffect(() => {
    calculateVW()
    window.addEventListener("resize", calculateVW)
    return () => window.removeEventListener("resize", calculateVW)
  }, [])

  function calculateVW() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`)
  }

  return (
    <>
      <Outlet />
    </>
  )
}
