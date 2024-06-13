import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { HomeIcon, TicketIcon, FilmIcon, TvIcon } from "@heroicons/outline"
import {
  HomeIcon as HomeIconSolid,
  TicketIcon as TicketIconSolid,
  FilmIcon as FilmIconSolid,
  TvIcon as TvIconSolid
} from "@heroicons/solid"
import { CompasIconSolid, CompasIcon } from "@src/utils/icons"

const sm_links = [
  { href: "/tickets", element: Link, icon: <TicketIcon />, activeIcon: <TicketIconSolid /> },
  { href: "/discover", element: Link, icon: <CompasIcon />, activeIcon: <CompasIconSolid /> },
  { href: "/", element: Link, icon: <HomeIcon />, activeIcon: <HomeIconSolid /> },
  { href: "/discover/series", element: Link, icon: <TvIcon />, activeIcon: <TvIconSolid /> },
  { href: "/discover/movies", element: Link, icon: <FilmIcon />, activeIcon: <FilmIconSolid /> },
]


export default function Menu() {
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
