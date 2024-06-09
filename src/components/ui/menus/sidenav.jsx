import { useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import { useWindowOffsets, useClickOutside } from "@utils/hooks"
import {
  HomeIcon,
  TicketIcon,
  FilmIcon,
  TvIcon,
  BookmarkIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/outline"
import {
  HomeIcon as HomeIconSolid,
  TicketIcon as TicketIconSolid,
  FilmIcon as FilmIconSolid,
  TvIcon as TvIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
} from "@heroicons/solid"
import { CompasIconSolid, CompasIcon, WideChevronLeftIcon } from "@src/utils/icons"
import logo from "@src/assets/logo.png"


const lg_links = [
  { tag: "Home", href: "/", icon: <HomeIcon /> },
  { tag: "Discover", href: "/discover", icon: <CompasIcon /> },
  { tag: "Movies", href: "/discover/movies", icon: <FilmIcon /> },
  { tag: "TV Shows", href: "/discover/series", icon: <TvIcon /> },
  { tag: "Reservation", href: "/reservation", icon: <TicketIcon /> },
  // { tag: null, href: null, icon: null },
  { tag: "Library", href: "/library", icon: <BookmarkIcon /> },
  { tag: "Settings", href: "/setting", icon: <Cog6ToothIcon /> },
  { tag: "Log In", href: "", icon: <UserCircleIcon /> },
]

const sm_links = [
  { tag: "TV Shows", href: "/discover/series", element: Link, icon: <TvIcon /> },
  { tag: "Movies", href: "/discover/movies", element: Link, icon: <FilmIcon /> },
  { tag: "Home", href: "/", element: Link, icon: <HomeIcon /> },
  { tag: "Discover", href: "/discover", element: Link, icon: <CompasIcon /> },
  { tag: "", href: null, element: "div", icon: <Squares2X2Icon /> },
]

const sub_links = [
  { tag: "Reservation", href: "/reservation", icon: <TicketIcon /> },
  { tag: "Library", href: "/library", icon: <BookmarkIcon /> }
]

const lg_solid_icons = [
  <HomeIconSolid />,
  <CompasIconSolid />,
  <FilmIconSolid />,
  <TvIconSolid />,
  <TicketIconSolid />,
  <BookmarkIconSolid />
]

const sm_solid_icons = [
  <TvIconSolid />,
  <FilmIconSolid />,
  <HomeIconSolid />,
  <CompasIconSolid />,
  <Squares2X2IconSolid />
]

const breakpoints = {
  xs: 460,
  sm: 520,
  md: 760,
  lg: 1300,
  xl: 1540,
}


export default function SideNav() {
  const {windowWidth} = useWindowOffsets()
  const [sidenavRef, animate] = useAnimate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isCollapsable = windowWidth < breakpoints.md ? false : true
  const [showSubMenu, setShowSubMenu] = useState(false)
  const submenuLinkRef = useRef(null)
  const location = useLocation()
  const sidenavWidth = {
    open: windowWidth > breakpoints.lg ?
      "min(235px, 20vw)" : 
      windowWidth > breakpoints.md ? 
      "min(215px, 22vw)" : 
      windowWidth > breakpoints.sm ?
      "auto" : "92%",
    collapsed: "auto",
  }

  useClickOutside(sidenavRef, handleClickOutside)

  function handleClickOutside() {
    setShowSubMenu(false)
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
      className={`sidenav ${isCollapsed ? "is-collapsed" : ""}`}
      ref={sidenavRef}
      // layout
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
      {windowWidth > breakpoints.sm && (
        <div className="logo-wrapper">
          <img className="logo" src={logo} />
          {windowWidth > breakpoints.md && <p className="tagline">Your Dad's Best Movie App</p>}
        </div>
      )}
      <nav className="nav-links">
        {windowWidth > 520
          ? lg_links.map((link, idx) => {
              const isActive = location.pathname === link.href
              return (
                <Link
                  to={link.href}
                  key={link.href}
                  className={`link ${isActive && "is-active"}`}
                >
                  <i className="icon">{isActive ? lg_solid_icons[idx] : link.icon}</i>
                  <p className="link-tag">
                    {link.tag}
                  </p>
                </Link>
            )})
          : sm_links.map((link, idx) => {
              const isSquares = sm_links.length - 1 === idx
              const isActive = location.pathname === link.href
              const Element = link.element
              return (
                <Element
                  ref={isSquares ? submenuLinkRef : null}
                  to={link.href}
                  key={link.href}
                  className={`link ${
                    isActive && "is-active"
                  }`}
                  onClick={() => { isSquares && setShowSubMenu(!showSubMenu) }}
                >
                  <i className="icon">{isActive ? sm_solid_icons[idx] : link.icon}</i>
                  <p className="link-tag">{link.tag}</p>
                  {isActive && <div className="indicator-dot" />}
                  {<AnimatePresence>
                    {isSquares && showSubMenu && <SubMenu setShowSubMenu={setShowSubMenu} />}
                  </AnimatePresence>}
                </Element>
              )
            })}
      </nav>
    </motion.div>
  );
}


function SubMenu() {
  return (
    <motion.div 
      className="submenu"
      initial={{ y: 50, opacity: 0.6 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{
        y: 60,
        opacity: 0.1,
        transition: {
          type: "tween",
          duration: 0.15
        }
      }}
    >
      {sub_links.map(link =>
        <Link
          to={link.href}
          key={link.href}
          className="link sub-link"
        >
          <i className="icon">{link.icon}</i>
          <p className="link-tag">{link.tag}</p>
        </Link>
      )}
    </motion.div>
  )
}
