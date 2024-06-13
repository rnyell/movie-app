import { Outlet } from "react-router-dom"
import Header from "@components/ui/header"
import Navigation from "@components/ui/menus/navigation"

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navigation />
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  )
}
