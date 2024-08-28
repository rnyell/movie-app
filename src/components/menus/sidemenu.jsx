import { useEffect } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "@src/auth/auth-context"
import {
  HomeIcon,
  TicketIcon,
  FilmIcon,
  TvIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/outline"
import { CompasIcon } from "@lib/ui/icons"
import { Divider } from "@lib/ui/components"
import AccountMenu from "../account-menu"
import logo from "@src/assets/logo.png"

import "./sidemenu.css"

const links = [
  { tag: "Home", href: "/", icon: <HomeIcon /> },
  { tag: "Discover", href: "/discover", icon: <CompasIcon /> },
  { tag: "Movies", href: "/discover/movies", icon: <FilmIcon /> },
  { tag: "TV Shows", href: "/discover/series", icon: <TvIcon /> },
  { tag: "Tickets", href: "/tickets", icon: <TicketIcon /> },
]

export default function SideMenu({ setOpen }) {
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    })
  }, [])


  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-[rgb(20_25_28/25%)]"
        initial={{opacity: 0.8}}
        animate={{opacity: 1}}
        exit={{opacity: 0.8}}
        transition={{duration: 0.2}}
        onClick={() => setOpen(false)}
      />
      <motion.aside
        className="side-menu fixed z-[var(--z-max)] w-[clamp(235px,25vw,260px)] text-[0.9rem]
          bg-primary-800 rounded-4xl shadow-[0_2px_1rem_rgb(11_15_17/75%)]"
        initial={{x: "-100%", opacity: 0.75}}
        animate={{x: 0, opacity: 1}}
        exit={{x: "-100%", opacity: 0.5}}
        transition={{duration: 0.35, type: "spring"}}
      >
        {isLoggedIn && (
          <>
            <AccountMenu className="mt-2" />
            <Divider space="md" width="almost-fill" />
          </>
        )}
        <nav className="menu-links mt-4 flex-col">
          {links.map(link => (
            <Link
              className="py-[0.65rem] px-4 flex gap-4 rounded-xl transition-bg duration-135 hover:bg-primary-600"
              key={link.href}
              to={link.href}
            >
              <i className="icon text-primary-300 w-[min(var(--icon-size-5),17px)]">{link.icon}</i>
              <p className="link-tag">{link.tag}</p>
            </Link>
          ))}
          <Divider space="md" width="almost-fill" />
          {!isLoggedIn && (
            <Link className="link" to="/login">
              <i className="icon">{<UserCircleIcon />}</i>
              <p className="link-tag">Log In</p>
            </Link>
          )}
          <div className="my-2" />
          <div className="p-1 align-center justify-center gap-2 text-[0.65rem] text-primary-400 unselectable">
            <img className="logo w-4" src={logo} />
            <span>Dad's Best Movie App</span>
          </div>
        </nav>
      </motion.aside>
    </>,
    document.getElementById("portal")
  )
}
