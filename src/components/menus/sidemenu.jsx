import { useEffect } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "@src/auth/auth-context"
import { HomeIcon, FilmIcon, TvIcon, UserCircleIcon } from "@heroicons/outline"
import { CompasIcon } from "@lib/ui/icons"
import { modalBackdropMotion, modalBackdroptransition } from "@lib/motion/motions"
import { Divider } from "@lib/ui/components"
import UserPanel from "./user-panel"

import logo from "@src/assets/logo.png"

import "./sidemenu.css"

const links = [
  { tag: "Home", href: "/", icon: <HomeIcon /> },
  { tag: "Movies", href: "/discover/movies", icon: <FilmIcon /> },
  { tag: "TV Shows", href: "/discover/series", icon: <TvIcon /> },
  { tag: "Discover", href: "/discover", icon: <CompasIcon /> },
]


export default function SideMenu({ setOpen }) {
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    })

    // TODO: remove listener
    // using `abort()` ?
  }, [])

  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 z-100 bg-[rgb(20_25_28/25%)]"
        onClick={() => setOpen(false)}
        {...modalBackdropMotion}
        transition={modalBackdroptransition}
      />
      <motion.aside
        className="side-menu p-[0.4rem] absolute z-100 w-[clamp(235px,25vw,260px)] text-[0.9rem]
          bg-primary-800 rounded-4xl shadow-[0_2px_1rem_rgb(11_15_17/75%)]"
        initial={{left: "-100%", opacity: 0.75}}
        animate={{left: 0, opacity: 1}}
        exit={{left: "-100%", opacity: 0.5, transition: { duration: 0.5 }}}
        transition={{duration: 0.35, type: "spring", bounce: 0.175}}
      >
        {isLoggedIn && (
          <>
            <UserPanel className="mt-2" />
            <Divider space="md" width="almost-fill" />
          </>
        )}
        <nav className="menu-links mt-4 flex-col gap-1">
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
            <Link className="py-[0.65rem] px-4 flex gap-4 rounded-xl transition-bg duration-135 hover:bg-primary-600" to="/login">
              <i className="icon text-primary-300 w-[min(var(--icon-size-5),17px)]">{<UserCircleIcon />}</i>
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
