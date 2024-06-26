import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { BellIcon } from "@heroicons/outline"
import AccountDropdown from "./account-dropdown"
import SearchBox from "./search-box"
import SideMenu from "./menus/sidemenu"


export default function Header({ hasSearchbox = true }) {
  const location = useLocation()
  const pathname = location.pathname
  const [isOpen, setIsOpen] = useState(false)
  const [dataset, setDataset] = useState("default")

  /* TODO: better ways to handle dataset for searchbox */
  useEffect(() => {
    if (pathname === "/") {
      setDataset("default normal")
    } else if (pathname.startsWith("/search") && hasSearchbox) {
      setDataset("stretched sticky")
    } else if (pathname.startsWith("/search") && !hasSearchbox) {
      setDataset("animated")
    } else if (pathname.startsWith("/movies") || pathname.startsWith("/series")) {
      setDataset("default transparent")
    } else {
      setDataset("default sticky")
    }
  }, [location])


  return (
    <header className="main-header align-center" data-set={dataset}>
      {(dataset.includes("stretched") || dataset.includes("animated")) && (
        <HamberIcon setIsOpen={setIsOpen} isOpen={isOpen} />
      )}
      <div className="search-box-wrapper flex-item">
        <SearchBox dataset={dataset} />
      </div>
      <div className="icons align-center">
        <i className="icon bell-icon">
          <BellIcon />
        </i>
        <AccountDropdown />
      </div>
      <AnimatePresence>
        {isOpen && <SideMenu setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </header>
  )
}

function HamberIcon({setIsOpen, isOpen}) {
  return (
    <i className="icon hamber-icon flex-col-center" onClick={() => setIsOpen(!isOpen)}>
      <motion.span
        className="line"
        style={{height: 1.5, width: 20, y: -1}}
        animate={isOpen ? {rotateZ: 45, y: 1} : {rotateZ: 0}}
      />
      <motion.span
        className="line"
        style={{marginRight: "auto", height: 1.5, width: 16, y: 1.5}}
        animate={isOpen ? {rotateZ: -45, width: 20, y: -1.5} : {rotateZ: 0}}
      />
    </i>
  )
}