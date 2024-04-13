import { Outlet } from "react-router-dom"
import Header from "@components/header"
import SideNav from "@components/sidenav"

export default function SharedLayout() {

  return (
    <div className="main-layout">
      <SideNav />
      <main>
        <Header dataset="sticky default" />
        <Outlet />
      </main>
    </div>
  )
}
