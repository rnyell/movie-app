import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "@src/auth/auth-context"
import { useThemeContext } from "@src/store"
import { BellIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/outline"
import { Presence } from "@lib/motion"
import { Button } from "@lib/ui/components"
import SearchBox from "./search-box"
import SideMenu from "../menus/sidemenu"
import AccountMenu from "../account-menu"

import "./header.css"

export default function Header({ hasSearchbox = true }) {
  const { isLoggedIn } = useAuth()
  const { isMobile } = useThemeContext()
  const { pathname } = useLocation()
  const [isOpen, setOpen] = useState(false)
  const [dataset, setDataset] = useState("default")

  /* TODO: better ways to handle dataset for searchbox */
  useEffect(() => {
    if (pathname === "/") {
      setDataset("default normal")
    } else if (pathname.startsWith("/search") && hasSearchbox) {
      setDataset("stretched sticky")
    } else if (pathname.startsWith("/search") && !hasSearchbox) {
      setDataset("animated")
    } else if (
      pathname.startsWith("/movies") ||
      pathname.startsWith("/series")
    ) {
      setDataset("default transparent")
    } else {
      setDataset("default sticky")
    }
  }, [pathname])

  return (
    <header className="main-header align-center" data-set={dataset}>
      {(dataset.includes("stretched") || dataset.includes("animated")) && (
        <HamberIcon setOpen={setOpen} isOpen={isOpen} />
      )}
      <div className="search-box-wrapper shrink-0 min-w-0">
        <SearchBox dataset={dataset} />
      </div>
      <div className="icons align-center">
        <Button
          variants="ghost"
          size="square-md"
          iconOnly
          iconSize="xl"
          svg={<BellIcon />}
          customStyles="rounded-full color-neutral-300"
        />
        {isMobile && (
          <Button
            variants="ghost"
            size="square-md"
            iconOnly
            iconSize="xl"
            svg={<Cog6ToothIcon />}
            customStyles="rounded-full color-neutral-300"
          />
        )}
        {isMobile &&
          (isLoggedIn ? (
            <AccountMenu isCollapsed={true} />
          ) : (
            <Link to="/login">
              <Button
                variants="ghost"
                size="square-md"
                iconOnly
                iconSize="xl"
                svg={<UserCircleIcon />}
                customStyles="rounded-full color-neutral-300"
              />
            </Link>
          ))}
      </div>
      <Presence trigger={isOpen}>
        <SideMenu setOpen={setOpen} />
      </Presence>
    </header>
  )
}

function HamberIcon({ setOpen, isOpen }) {
  const iconStyles = {
    position: "relative",
    gap: 1,
  }

  const lineStyles = {
    borderRadius: 10,
    backgroundColor: "var(--color-neutral-300)",
    transformOrigin: "center",
  }

  return (
    <i
      className="icon flex-col-center cursor-pointer"
      style={iconStyles}
      onClick={() => setOpen(!isOpen)}
    >
      <motion.span
        className="line"
        style={{ ...lineStyles, height: 1.5, width: 20, y: -1 }}
        animate={isOpen ? { rotateZ: 45, y: 1 } : { rotateZ: 0 }}
      />
      <motion.span
        className="line"
        style={{
          ...lineStyles,
          marginRight: "auto",
          height: 1.5,
          width: 16,
          y: 1.5,
        }}
        animate={isOpen ? { rotateZ: -45, width: 20, y: -1.5 } : { rotateZ: 0 }}
      />
    </i>
  )
}
