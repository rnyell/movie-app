import { Outlet } from "react-router-dom"
import Valve from "@lib/motion/valve"
import Header from "../headers/header"
import Navigation from "../menus/navigation"


export default function Layout({ variant }) {
  switch (variant) {
    case "root": {
      return <Outlet />
    }
    case "primary": {
      return (
        <div className="main-layout">
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
