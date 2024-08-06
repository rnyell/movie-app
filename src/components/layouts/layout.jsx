import { Outlet } from "react-router-dom"
import { Valve, Presence } from "@lib/motion"
import { useAppContext } from "@src/store"
import Header from "../headers/header"
import Navigation from "../menus/navigation"
import DisplayedModal from "../modals/displayed-modal"

import classes from "./layout.module.css"
import { AnimatePresence } from "framer-motion"


export default function Layout({ variant }) {
  const { modals } = useAppContext()

  switch (variant) {
    case "root": {
      return (
        <>
          <Outlet />
          {/*//! TODO, exit animation not working */}
          <AnimatePresence>
            <DisplayedModal />
          </AnimatePresence>
        </>
      )
    }
    case "primary": {
      return (
        <div className={classes.mainLayout}>
          <Navigation />
          <main>
            <Header />
            <Valve />
          </main>
        </div>
      )
    }
    case "secondary": {
      return <Valve />
    }
  }
}
