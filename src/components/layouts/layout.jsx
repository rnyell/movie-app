import { Outlet } from "react-router-dom"
import { Valve } from "@lib/motion"
import Header from "../headers/header"
import Navigation from "../menus/navigation"
import DisplayedModal from "../modals/displayed-modal"

import classes from "./layout.module.css"

export default function Layout({ variant }) {
  switch (variant) {
    case "root": {
      return (
        <>
          <Outlet />
        </>
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
          <DisplayedModal />
        </div>
      )
    }
    case "secondary": {
      return <Valve />
    }
  }
}
