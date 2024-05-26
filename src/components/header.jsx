import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UserCircleIcon, BellIcon } from "@heroicons/outline"
import SearchBox from "./search-box"
import { SideMenu } from "./menus"


export default function Header({ hasSearchbox = true }) {
  const [isOpen, setIsOpen] = useState(false)
  const [dataset, setDataset] = useState("default")
  const pathname = location.pathname

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
        <i className="icon hamber-icon flex-col-center" onClick={() => setIsOpen(!isOpen)}>
          <motion.span
            className="line line-1"
            style={{width: 20}}
            animate={isOpen ? {rotateZ: 45} : {rotateZ: 0}}
          ></motion.span>
          <motion.span
            className="line line-2"
            style={{marginRight: "auto", marginTop: 4, width: 16}}
            animate={isOpen ? {rotateZ: -45, width: 20, marginTop: 0} : {rotateZ: 0}}
          ></motion.span>
        </i>
      )}
      <div className="search-box-wrapper flex-item">
        <SearchBox dataset={dataset} />
      </div>
      <div className="icons align-center">
        <i className="icon bell-icon">
          <BellIcon />
        </i>
        <button className="btn login-link">
          <i className="icon user-icon">
            <UserCircleIcon />
          </i>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </header>
  )
}
