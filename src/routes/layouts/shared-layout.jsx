import { Outlet } from "react-router-dom"
import Header from "@components/header"
import SideNav from "@components/sidenav"

export default function SharedLayout() {
  return (
    <div className="shared-layout">
      <SideNav />
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  )
}
