import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, useAnimate } from "framer-motion"
import { useClickOutside, useWindowOffsets } from "@lib/hooks"
import { useThemeContext } from "@src/store"
import { breakpoints } from "@lib/ui/configs"
import {
  HomeIcon,
  TicketIcon,
  FilmIcon,
  TvIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/outline"
import {
  HomeIcon as HomeIconSolid,
  TicketIcon as TicketIconSolid,
  FilmIcon as FilmIconSolid,
  TvIcon as TvIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  MoonIcon,
  SunIcon
} from "@heroicons/solid"
import { CompasIconSolid,
  CompasIcon,
  WideChevronLeftIcon,
  BugIcon,
  Palette,
  ArrowLeftToLineIcon
} from "@lib/ui/icons"
import logo from "@src/assets/logo.png"
import { Presence } from "@lib/motion"
import { Divider } from "@lib/ui/components"
import AccountMenu from "../account-menu"

import "./navigation.css"

const lg_links = [
  { tag: "Home", href: "/", icon: <HomeIcon />, activeIcon: <HomeIconSolid /> },
  { tag: "Discover", href: "/discover", icon: <CompasIcon />, activeIcon: <CompasIconSolid /> },
  { tag: "Movies", href: "/discover/movies", icon: <FilmIcon />, activeIcon: <FilmIconSolid /> },
  { tag: "TV Shows", href: "/discover/series", icon: <TvIcon />, activeIcon: <TvIconSolid /> },
  { tag: "Tickets", href: "/tickets", icon: <TicketIcon />, activeIcon: <TicketIconSolid /> },
]

const sm_links = [
  { href: "/tickets", icon: <TicketIcon />, activeIcon: <TicketIconSolid /> },
  { href: "/discover", icon: <CompasIcon />, activeIcon: <CompasIconSolid /> },
  { href: "/", icon: <HomeIcon />, activeIcon: <HomeIconSolid /> },
  { href: "/discover/series", icon: <TvIcon />, activeIcon: <TvIconSolid /> },
  { href: "/discover/movies", icon: <FilmIcon />, activeIcon: <FilmIconSolid /> },
]

const tagline = "Your Dad's Best Movie App"


export default function Navigation() {
  const {windowWidth} = useWindowOffsets()
  const isSmallScreen = windowWidth <= breakpoints.sm

  if (isSmallScreen) {
    return <BottomNav />
  } else {
    return <SideNav />
  }
}

/* on sm screen */
function BottomNav() {
  const { pathname } = useLocation()

  return (
    <div className="navigation" data-variant="menu">
      <nav className="nav-links flex">
        {sm_links.map(link => (
          <Link
            className={`link ${pathname === link.href && "is-active"}`}
            to={link.href}
            key={link.href}
          >
            <i className="icon icon-2xl">{pathname === link.href ? link.activeIcon : link.icon}</i>
            {pathname === link.href && <motion.div className="indicator-dot absolute-x-center" layoutId="dot" />}
          </Link>
        ))}
      </nav>
    </div>
  )
}

/* on lg screen */
function SideNav() {
  const {windowWidth} = useWindowOffsets()
  const isCollapsable = windowWidth < breakpoints.md ? false : true
  const [sidenavRef, animate] = useAnimate()
  const [isCollapsed, setCollapse] = useState(false)

  useEffect(() => {
    if (windowWidth < breakpoints.md) {
      setCollapse(true)
    }
  }, [windowWidth])

  function toggleSidenav() {
    if (isCollapsed) {
      animate(".tagline", {opacity: 1}, {type: "tween"})
      setCollapse(false)
    } else {
      animate(".tagline", {opacity: 0}, {type: "tween", duration: 0.2})
      setCollapse(true)
    }
  }


  return (
    <motion.div
      className="navigation flex-col"
      data-variant="sidenav"
      data-collapsed={isCollapsed}
      ref={sidenavRef}
      animate={isCollapsed ? {width: 80} : {width: "min(230px, 20vw)"}}
      transition={{duration: 0.375, type: "tween", ease: "easeOut"}}
    >
      <div className="logo-wrapper">
        <img className="logo" src={logo} draggable={false} />
        {windowWidth > breakpoints.md && <p className="tagline unselectable">{tagline}</p>}
      </div>
      <div className="relative w-full">
        <Divider variant="pale" />
        {isCollapsable && (
        <button className="btn toggle-btn absolute-y-center" onClick={toggleSidenav}>
          <motion.i
            className="icon toggle-icon icon-xs"
            style={isCollapsed ? {rotateZ: 180} : {rotateZ: 0}}
          >
            <WideChevronLeftIcon />
          </motion.i>
        </button>
      )}
      </div>
      <nav className="nav-links flex-col">
        {lg_links.map(link => 
          <NavLink
            href={link.href}
            tag={link.tag}
            icon={link.icon}
            activeIcon={link.activeIcon}
            isCollapsed={isCollapsed}
            key={link.href}
          />
        )}
        <Divider variant="pale" width="almost-fill" />
        <SettingsMenu isCollapsed={isCollapsed} />
        <AccountMenu isCollapsed={isCollapsed} />
      </nav>
    </motion.div>
  )
}

export const tagMotion = {
  initial: {
    opacity: 0,
    x: -10
  },
  animate: {
    opacity: 1,
    x: 0
  },
  exit: {
    opacity: 0,
    x: -15
  },
}

export const tagTransition = {
  duration: 0.25
}

export function NavLink({
  href,
  type = "link",
  tag,
  icon,
  activeIcon,
  isCollapsed,
  ...props
}) {
  const location = useLocation()
  const isActive = location.pathname === href
  const Element = type === "link" ? Link : "button"

  return (
    <Element className={`link ${isActive ? "is-active" : ""}`} to={href} {...props}>
      <i className="icon icon-md">{isActive ? activeIcon : icon}</i>
      <Presence trigger={!isCollapsed}>
        <motion.p className="tag" {...tagMotion} transition={tagTransition}>
          {tag}
        </motion.p>
      </Presence>
    </Element>
  )
}

function SettingsMenu({ isCollapsed }) {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, () => setOpen(false))

  function handleClick() {
    if (!isOpen) {
      setOpen(true)
    }
  }

  return (
    <div className="settings link" ref={ref} onClick={handleClick}>
      <i className="icon icon-md"><Cog6ToothIcon /></i>
      <Presence trigger={!isCollapsed}>
        <motion.p className="tag" {...tagMotion} transition={tagTransition}>
          Settings
        </motion.p>
      </Presence>
      {!isCollapsed && <i className="icon ml-auto"><ChevronDownIcon /></i>}
      <Presence trigger={isOpen}>
        <SettingsOptions />
      </Presence>
    </div>
  )
}

function SettingsOptions() {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, () => setOpen(false))

  const variants = {
    initial: {
      opacity: 0.5,
      y: -20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    }
  }


  return (
    <motion.ul
      className="settings-options flex-col absolute"
      data-submenu
      {...variants}
      ref={ref}
    >
      <li data-submenu-item onClick={() => setOpen(!isOpen)}>
        <i className="icon icon-md"><Palette /></i>
        <p className="tag">Appearance</p>
        <i className="icon icon-xs ml-auto"><ChevronRightIcon /></i>
      </li>
      <li data-submenu-item>
        <i className="icon icon-md"><QuestionMarkCircleIcon /></i>
        <p className="tag">FAQ</p>
      </li>
      <a data-submenu-item href="https://github.com/rnyell/movie-app" target="_blank">
        <i className="icon icon-md"><CommandLineIcon /></i>
        <p className="tag">Contribute</p>
      </a>
      <a data-submenu-item href="https://t.me/" target="_blank">
        <i className="icon icon-md"><BugIcon /></i>
        <p className="tag">Report Issues</p>
      </a>
      <Presence trigger={isOpen}>
        <ThemeOptions />
      </Presence>
    </motion.ul>
  )
}

function ThemeOptions() {
  const { prefState, prefDispatch } = useThemeContext()

  function handleChange(e) {
    if (!e.target.checked) {
      prefDispatch({ type: "change_theme", theme: "light" })
    } else {
      prefDispatch({ type: "change_theme", theme: "dark" })
    }
  }

  const variants = {
    initial: {
      opacity: 0.5,
      x: -12,
      y: 2,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: -12,
      y: 2,
    }
  }


  return (
    <motion.div
      className="themes-options absolute"
      data-submenu
      {...variants}
    >
      <div data-submenu-item>
        <label htmlFor="mode">
          <p>Theme</p>
          <span className="checkbox">
            <i className="icon icon-xs">
              {prefState.theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </i>
            <input
              type="checkbox"
              name="theme"
              id="mode"
              checked={prefState.theme === "dark"}
              onChange={handleChange}
            />
          </span>
        </label>
      </div>
      <div data-submenu-item>
        <p>Accent</p>
        <div>
          <label htmlFor="accent-1">
            <input type="radio" name="accent" id="accent-1" />
          </label>
          <label htmlFor="accent-2">
            <input type="radio" name="accent" id="accent-2" />
          </label>
        </div>
      </div>
    </motion.div>
  )
}
