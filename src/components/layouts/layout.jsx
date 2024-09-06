import { useRef } from "react"
import { Outlet } from "react-router-dom"
import { useThemeContext } from "@src/store"
import { Valve } from "@lib/motion"
import Cursor from "@lib/ui/components/cursor"
import { CursorIcon } from "@lib/ui/icons"
import Header from "../headers/header"
import Navigation from "../menus/navigation"
import DisplayedModal from "../modals/displayed-modal"

import classes from "./layout.module.css"

export default function Layout({ variant }) {
  const { preferences: { cursor } } = useThemeContext()
  const ref = useRef(null)

  function onMouseMove(event) {
    const { clientX, clientY } = event
    // const { width } = ref.current.getBoundingClientRect()
    // const x = clientX - (width / 2)
    // const y = clientY - (width / 2)
    const translate = `${clientX.toFixed(2)}px ${clientY.toFixed(2)}px`
    const frames = { translate }
    const transition = { duration: 100, fill: "forwards" }
    ref.current.animate(frames, transition)
  }

  switch (variant) {
    case "root": {
      return (
        <div onMouseMove={cursor === "custom" ? onMouseMove : null}>
          <Outlet />
          <DisplayedModal />
          <Cursor className={`text-gray-50 ${cursor !== "custom" && "!hidden"}`} ref={ref}>
            <CursorIcon />
          </Cursor>
        </div>
      )
    }
    case "primary": {
      return (
        <div className={classes.primary}>
          <Navigation />
          <main>
            <Header />
            <Valve />
          </main>
        </div>
      )
    }
    case "secondary": {
      return (
        <Valve />
      )
    }
  }
}
