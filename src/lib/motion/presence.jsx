import { AnimatePresence } from "framer-motion"

export default function Presence({
  children,
  trigger,
  initial = true,
  mode = "sync"
}) {
  return (
    <AnimatePresence mode={mode} initial={initial}>
      {trigger && children}
    </AnimatePresence>
  )
}
