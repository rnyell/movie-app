import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useClickOutside, useWindowOffsets } from "@lib/hooks"
import { useAuth } from "@src/auth/auth-context"
import { useThemeContext } from "@src/store"
import { breakpoints } from "@lib/ui/configs"
import {
  HomeIcon,
  TicketIcon,
  FilmIcon,
  TvIcon,
  UserCircleIcon,
  Cog6ToothIcon as CogIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CommandLineIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/outline"
import {
  HomeIcon as HomeIconSolid,
  TicketIcon as TicketIconSolid,
  FilmIcon as FilmIconSolid,
  TvIcon as TvIconSolid,
  // Cog6ToothIcon as CogIconSolid,
  MoonIcon,
  SunIcon,
} from "@heroicons/solid"
import {
  CompasIconSolid,
  CompasIcon,
  WideChevronLeftIcon,
  BugIcon,
  Palette,
  // ArrowLeftToLineIcon
} from "@lib/ui/icons"
import logo from "@src/assets/logo.png"
import { Presence } from "@lib/motion"
import { Divider, Dropdown } from "@lib/ui/components"
import AccountMenu from "../account-menu"

import cn from "@src/lib/ui/cn"
import "./navigation.css"
import Settings from "./settings"

const lg_links = [
  { tag: "Home", href: "/", icon: <HomeIcon />, activeIcon: <HomeIconSolid /> },
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
  {
    tag: "Tickets",
    href: "/tickets",
    icon: <TicketIcon />,
    activeIcon: <TicketIconSolid />,
  },
]

const sm_links = [
  { href: "/tickets", icon: <TicketIcon />, activeIcon: <TicketIconSolid /> },
  { href: "/discover", icon: <CompasIcon />, activeIcon: <CompasIconSolid /> },
  { href: "/", icon: <HomeIcon />, activeIcon: <HomeIconSolid /> },
  { href: "/discover/series", icon: <TvIcon />, activeIcon: <TvIconSolid /> },
  {
    href: "/discover/movies",
    icon: <FilmIcon />,
    activeIcon: <FilmIconSolid />,
  },
]

export const navLink_styles = `
  py-[0.675rem] px-4 align-center gap-3 relative rounded-xl transition duration-135 text-[min(0.8rem,16px)]
  hover:text-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-900)]
  data-[collapsed=true]:self-center
`
const navLinkActive_styles = `!text-[var(--color-neutral-100)] !bg-[var(--color-neutral-700)]`

export const tagMotion = {
  initial: {
    opacity: 0,
    x: -10,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -15,
  },
}

export const tagTransition = {
  duration: 0.25,
}

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
              `p-[0.825rem] inline-flex relative text-[var(--color-neutral-400)]`,
              { "text-[var(--color-neutral-100)]": pathname === link.href },
            )}
            to={link.href}
            key={link.href}
          >
            <i className="icon icon-2xl">
              {pathname === link.href ? link.activeIcon : link.icon}
            </i>
            {pathname === link.href && (
              <motion.div
                className="indicator-dot size-[4px] absolute-x-center -bottom-[2px] rounded-full bg-[var(--color-neutral-200)]"
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
          <button
            className="btn toggle-btn absolute-y-center"
            onClick={() => setCollapse(!isCollapsed)}
          >
            <motion.i
              className="icon toggle-icon icon-xs"
              style={isCollapsed ? { rotateZ: 180 } : { rotateZ: 0 }}
            >
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
        <Settings isCollapsed={isCollapsed} />
        {/* <SettingsMenu isCollapsed={isCollapsed} /> */}
        {session ? (
          <AccountMenu isCollapsed={isCollapsed} />
        ) : (
          <NavLink
            isCollapsed={isCollapsed}
            href="/login"
            icon={<UserCircleIcon />}
            className="mt-auto mb-6"
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
    <div
      className={`settings ${navLink_styles}`}
      data-collapsed={isCollapsed}
      ref={ref}
      onClick={handleClick}
    >
      <i className="icon icon-md">
        <CogIcon />
      </i>
      <NavTag tag="Settings" isCollapsed={isCollapsed} />
      {!isCollapsed && (
        <i className="icon ml-auto">
          <ChevronDownIcon />
        </i>
      )}
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
    },
  }

  return (
    <motion.ul
      className="settings-options flex-col absolute"
      data-menu
      ref={ref}
      {...variants}
    >
      <li data-menu-item onClick={() => setOpen(!isOpen)}>
        <i className="icon icon-md">
          <Palette />
        </i>
        <p>Appearance</p>
        <i className="icon icon-xs ml-auto">
          <ChevronRightIcon />
        </i>
      </li>
      <li data-menu-item>
        <i className="icon icon-md">
          <QuestionMarkCircleIcon />
        </i>
        <p>FAQ</p>
      </li>
      <a
        data-menu-item
        href="https://github.com/rnyell/movie-app"
        target="_blank"
      >
        <i className="icon icon-md">
          <CommandLineIcon />
        </i>
        <p>Contribute</p>
      </a>
      <a data-menu-item href="https://t.me/" target="_blank">
        <i className="icon icon-md">
          <BugIcon />
        </i>
        <p>Report Issues</p>
      </a>
      <Presence trigger={isOpen}>
        <ThemeOptions />
      </Presence>
    </motion.ul>
  )
}

function ThemeOptions() {
  const { preferences, prefDispatch } = useThemeContext()

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
    },
  }

  return (
    <motion.div className="themes-options absolute" data-menu {...variants}>
      <div data-menu-item>
        <label htmlFor="mode">
          <p>Theme</p>
          <span className="checkbox">
            <i className="icon icon-xs">
              {preferences.theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </i>
            <input
              type="checkbox"
              name="theme"
              id="mode"
              checked={preferences.theme === "dark"}
              onChange={handleChange}
            />
          </span>
        </label>
      </div>
      <div data-menu-item>
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
