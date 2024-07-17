import { Outlet } from "react-router-dom"
import Valve from "@lib/motion/valve"
import Header from "@components/ui/header"
import Menu from "@components/ui/menus/menu"


export default function Layout({ variant }) {
  switch (variant) {
    case "root": {
      return <Outlet />
    }
    case "primary": {
      return (
        <div className="main-layout">
          <Menu />
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
