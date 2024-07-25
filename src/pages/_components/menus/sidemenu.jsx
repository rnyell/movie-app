import { useEffect } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
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
import { CompasIcon } from "@src/lib/ui/icons"
import { Divider } from "@src/lib/ui/components"
import logo from "@src/assets/logo.png"

const links = [
  { tag: "Home", href: "/", icon: <HomeIcon /> },
  { tag: "Discover", href: "/discover", icon: <CompasIcon /> },
  { tag: "Movies", href: "/discover/movies", icon: <FilmIcon /> },
  { tag: "TV Shows", href: "/discover/series", icon: <TvIcon /> },
  { tag: "Tickets", href: "/tickets", icon: <TicketIcon /> },
]

export default function SideMenu({ setIsOpen }) {
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    })
  }, [])


  return createPortal(
    <>
      <motion.div
        className="menu-backdrop"
        initial={{opacity: 0.8}}
        animate={{opacity: 1}}
        exit={{opacity: 0.8}}
        transition={{duration: 0.2}}
        onClick={() => setIsOpen(false)}
      />
      <motion.aside
        className="side-menu"
        initial={{x: "-100%", opacity: 0.65}}
        animate={{x: 0, opacity: 1}}
        exit={{x: "-100%", opacity: 0.7}}
        transition={{duration: 0.35, type: "spring"}}
      >
        <div className="logo-wrapper align-center">
          <img src={logo} className="logo" />
        </div>
        <nav className="menu-links flex-col">
          {links.map(link => (
            <Link
              className="link"
              key={link.href}
              to={link.href}
            >
              <i className="icon">{link.icon}</i>
              <p className="link-tag">{link.tag}</p>
            </Link>
          ))}
          <Divider space="md" width="almost-fill" />
          <div className="empty-link" />
          <div className="footer unselectable">
            <span>Dad's Best Movie App</span>
          </div>
        </nav>
      </motion.aside>
    </>,
    document.getElementById("portal")
  )
}
