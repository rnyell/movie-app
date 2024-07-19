import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, useAnimate } from "framer-motion"
import {
  HomeIcon,
  TicketIcon,
  FilmIcon,
  TvIcon,
  Cog6ToothIcon
} from "@heroicons/outline"
import {
  HomeIcon as HomeIconSolid,
  TicketIcon as TicketIconSolid,
  FilmIcon as FilmIconSolid,
  TvIcon as TvIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/solid"
import { CompasIconSolid, CompasIcon, WideChevronLeftIcon } from "@lib/icons"
import { useWindowOffsets } from "@lib/hooks"
import { breakpoints } from "@src/lib/ui/configs"
import logo from "@src/assets/logo.png"
import AccountDropdown from "@components/account/account-dropdown"

const lg_links = [
  { tag: "Home", href: "/", type: "link", icon: <HomeIcon />, activeIcon: <HomeIconSolid /> },
  { tag: "Discover", href: "/discover", type: "link", icon: <CompasIcon />, activeIcon: <CompasIconSolid /> },
  { tag: "Movies", href: "/discover/movies", type: "link", icon: <FilmIcon />, activeIcon: <FilmIconSolid /> },
  { tag: "TV Shows", href: "/discover/series", type: "link", icon: <TvIcon />, activeIcon: <TvIconSolid /> },
  { tag: "Tickets", href: "/tickets", type: "link", icon: <TicketIcon />, activeIcon: <TicketIconSolid /> },
  // { tag: "Settings", href: "/setting", type: "button", icon: <Cog6ToothIcon />, activeIcon: <Cog6ToothIconSolid /> },
]

const sm_links = [
  { href: "/tickets", element: Link, icon: <TicketIcon />, activeIcon: <TicketIconSolid /> },
  { href: "/discover", element: Link, icon: <CompasIcon />, activeIcon: <CompasIconSolid /> },
  { href: "/", element: Link, icon: <HomeIcon />, activeIcon: <HomeIconSolid /> },
  { href: "/discover/series", element: Link, icon: <TvIcon />, activeIcon: <TvIconSolid /> },
  { href: "/discover/movies", element: Link, icon: <FilmIcon />, activeIcon: <FilmIconSolid /> },
]


export default function Menu() {
  const {windowWidth} = useWindowOffsets()
  const isSmallScreen = windowWidth <= breakpoints.sm

  if (isSmallScreen) {
    return <BottomNav />
  } else {
    return <SideNav />
  }
}


function SideNav() {
  const location = useLocation()
  const {windowWidth} = useWindowOffsets()
  const isCollapsable = windowWidth < breakpoints.md ? false : true
  const [sidenavRef, animate] = useAnimate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const sidenavWidth = {
    open: windowWidth > breakpoints.lg ?
      "min(235px, 20vw)" : 
      windowWidth > breakpoints.md ? 
      "min(215px, 22vw)" : 
      "auto",
    collapsed: "auto",
  }

  function toggleSidenav() {
    if (!isCollapsed) {
      animate(".toggle-icon", {rotateZ: 180}, {type: "tween"})
      animate(".link-tag", {opacity: 0, x: -12}, {duration: 0.2})
      setIsCollapsed(true)
    } else {
      animate(".toggle-icon", {rotateZ: 0}, {type: "tween"})
      animate(".link-tag", {opacity: 1, x: 0})
      setIsCollapsed(false)
    }
  }

  return (
    <motion.div
      className="menu"
      data-variant="sidenav"
      data-state={isCollapsed}
      ref={sidenavRef}
      // layout="size"
      animate={isCollapsed ? {width: sidenavWidth.collapsed} : {width: sidenavWidth.open}}
      transition={{duration: 0.25, type: "tween", ease: [0.17, 0.67, 0.83, 0.67]}}
    >
      {isCollapsable && (
        <button className="btn toggle-btn absolute" onClick={toggleSidenav}>
          <i className="icon toggle-icon">
            <WideChevronLeftIcon />
          </i>
        </button>
      )}
      <div className="logo-wrapper">
        <img className="logo" src={logo} draggable={false} />
        {windowWidth > breakpoints.md && <p className="tagline unselectable">Your Dad's Best Movie App</p>}
      </div>
      <nav className="nav-links">
        {lg_links.map(link => {
          const isActive = location.pathname === link.href

          return (
            <Link
              className={`link ${isActive && "is-active"}`}
              to={link.href}
              key={link.href}
            >
              <i className="icon">{isActive ? link.activeIcon : link.icon}</i>
              <p className="link-tag">
                {link.tag}
              </p>
            </Link>
          )
        })}
        <AccountDropdown />
      </nav>
    </motion.div>
  )
}


function BottomNav() {
  const location = useLocation()

  return (
    <div className="menu" data-variant="menu">
      <nav className="nav-links">
        {sm_links.map(link => {
          const Element = link.element
          const isActive = location.pathname === link.href
          return (
            <Element
              className={`link ${isActive && "is-active"}`}
              to={link.href}
              key={link.href}
            >
              <i className="icon">{isActive ? link.activeIcon : link.icon}</i>
              {isActive && <motion.div className="indicator-dot absolute-justify-center" layoutId="dot" />}
            </Element>
          )
        })}
      </nav>
    </div>
  )
}
