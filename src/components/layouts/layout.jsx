import { Outlet } from "react-router-dom"
import Valve from "@lib/motion/valve"
import Presence from "@src/lib/motion/presence"
import { useAppContext } from "@src/store"
import Header from "../headers/header"
import Navigation from "../menus/navigation"
import DisplayedModal from "../modals/displayed-modal"


export default function Layout({ variant }) {
  const { modals } = useAppContext()

  switch (variant) {
    case "root": {
      return (
        <>
          <Outlet />
          <Presence trigger={modals.isOpen}>
            <DisplayedModal />
          </Presence>
        </>
      )
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
