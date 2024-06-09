import { Outlet } from "react-router-dom"
import Header from "@components/ui/header"
import SideNav from "@components/ui/menus/sidenav"

export default function MainLayout() {
  return (
    <div className="main-layout">
      <SideNav />
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  )
}
