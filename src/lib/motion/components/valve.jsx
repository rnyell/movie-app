import { cloneElement } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

// this is the "animated" version of <Outlet /> component
export function Valve() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <AnimatePresence initial={false}>
      {outlet && cloneElement(outlet, { key: location.pathname })}
    </AnimatePresence>
  )
}
