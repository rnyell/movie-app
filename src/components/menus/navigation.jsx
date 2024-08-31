import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useWindowOffsets } from "@lib/hooks"
import { useAuth } from "@src/auth/auth-context"
import { breakpoints } from "@lib/ui/configs"
import cn from "@lib/ui/cn"
import { HomeIcon as HomeIconSolid, FilmIcon as FilmIconSolid, TvIcon as TvIconSolid } from "@heroicons/solid"
import { HomeIcon, FilmIcon, TvIcon, UserCircleIcon } from "@heroicons/outline"
import { CompasIconSolid, CompasIcon, WideChevronLeftIcon } from "@lib/ui/icons"
import { Presence } from "@lib/motion"
import { Divider } from "@lib/ui/components"
import Settings from "./settings"
import UserPanel from "./user-panel"

import { navLink_styles, navLinkActive_styles, tagMotion, tagTransition } from "./utils"

import logo from "@src/assets/logo.png"

import "./navigation.css"

const lg_links = [
  {
    tag: "Home",
    href: "/",
    icon: <HomeIcon />,
    activeIcon: <HomeIconSolid />
  },
  {
    tag: "Discover",
    href: "/discover",
    icon: <CompasIcon />,
    activeIcon: <CompasIconSolid />,
  },
  {
    tag: "Movies",
    href: "/discover/movies",
    icon: <FilmIcon />,
    activeIcon: <FilmIconSolid />,
  },
  {
    tag: "TV Shows",
    href: "/discover/series",
    icon: <TvIcon />,
    activeIcon: <TvIconSolid />,
  },
]

const sm_links = [
  { href: "/discover", icon: <CompasIcon />, activeIcon: <CompasIconSolid /> },
  { href: "/", icon: <HomeIcon />, activeIcon: <HomeIconSolid /> },
  { href: "/discover/series", icon: <TvIcon />, activeIcon: <TvIconSolid /> },
  { href: "/discover/movies", icon: <FilmIcon />, activeIcon: <FilmIconSolid /> },
]


export default function Navigation() {
  const { windowWidth } = useWindowOffsets()
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
      <nav className="flex justify-around">
        {sm_links.map((link) => (
          <Link
            className={cn(
              `p-[0.825rem] inline-flex relative text-primary-400`,
              { "text-primary-100": pathname === link.href },
            )}
            to={link.href}
            key={link.href}
          >
            <i className="icon icon-2xl">
              {pathname === link.href ? link.activeIcon : link.icon}
            </i>
            {pathname === link.href && (
              <motion.div
                className="indicator-dot size-[4px] absolute-x-center -bottom-[2px] rounded-full bg-primary-200"
                layoutId="dot"
              />
            )}
          </Link>
        ))}
      </nav>
    </div>
  )
}

/* on lg screen */
function SideNav() {
  const { session } = useAuth()
  const { windowWidth } = useWindowOffsets()
  const isCollapsable = windowWidth < breakpoints.md ? false : true
  const [isCollapsed, setCollapse] = useState(false)
  const sidenavRef = useRef()

  useEffect(() => {
    if (windowWidth < breakpoints.md) {
      setCollapse(true)
    }
  }, [windowWidth])

  return (
    <motion.div
      className="navigation flex-col"
      data-variant="sidenav"
      data-collapsed={isCollapsed}
      ref={sidenavRef}
      animate={isCollapsed ? { width: 80 } : { width: "min(230px, 21vw)" }}
      transition={{ duration: 0.375, type: "tween", ease: "easeOut" }}
    >
      <div className="logo-wrapper">
        <img className="logo" src={logo} draggable={false} />
        {windowWidth > breakpoints.md && (
          <Presence trigger={!isCollapsed}>
            <motion.p
              className="min-h-8 font-medium text-[0.625rem] data-[collapsed=true]:hidden unselectable"
              data-collapsed={isCollapsed}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              Your Dad's Best Movie App
            </motion.p>
          </Presence>
        )}
      </div>
      <div className="relative w-full">
        <Divider variant="pale" />
        {isCollapsable && (
          <button className="btn toggle-btn absolute-y-center" onClick={() => setCollapse(!isCollapsed)}>
            <motion.i className="icon toggle-icon icon-xs" style={isCollapsed ? {rotateZ: 180} : {rotateZ: 0}}>
              <WideChevronLeftIcon />
            </motion.i>
          </button>
        )}
      </div>
      <nav className="nav-links mt-6 grow gap-1.5 flex-col">
        {lg_links.map((link) => (
          <NavLink
            isCollapsed={isCollapsed}
            href={link.href}
            icon={link.icon}
            activeIcon={link.activeIcon}
            key={link.href}
          >
            <NavTag tag={link.tag} isCollapsed={isCollapsed} />
          </NavLink>
        ))}
        <Divider variant="pale" width="almost-fill" />
        <Settings loc="sidenav" isCollapsed={isCollapsed} />
        {session ? (
          <UserPanel isCollapsed={isCollapsed} />
        ) : (
          <NavLink
            className="mt-auto mb-6"
            isCollapsed={isCollapsed}
            href="/login"
            icon={<UserCircleIcon />}
          >
            <NavTag tag="Log In" isCollapsed={isCollapsed} />
          </NavLink>
        )}
      </nav>
    </motion.div>
  )
}

export function NavLink({
  isCollapsed,
  href = null,
  icon,
  activeIcon,
  className,
  children,
  ...props
}) {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <Link
      className={cn(
        navLink_styles,
        { [navLinkActive_styles]: isActive },
        className,
      )}
      data-collapsed={isCollapsed}
      to={href}
      {...props}
    >
      <i className="icon icon-md">{isActive ? activeIcon : icon}</i>
      {children}
    </Link>
  )
}

export function NavTag({ tag, isCollapsed }) {
  return (
    <Presence trigger={!isCollapsed} data-collapsed={isCollapsed}>
      <motion.p
        className="whitespace-nowrap data-[collapsed=true]:hidden"
        {...tagMotion}
        transition={tagTransition}
      >
        {tag}
      </motion.p>
    </Presence>
  )
}
