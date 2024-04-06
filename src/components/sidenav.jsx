import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  HomeIcon,
  TicketIcon,
  FilmIcon,
  TvIcon,
  BookmarkIcon,
  Squares2X2Icon,
} from "@heroicons/outline"
import {
  HomeIcon as HomeIconSolid,
  TicketIcon as TicketIconSolid,
  FilmIcon as FilmIconSolid,
  TvIcon as TvIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
} from "@heroicons/solid"
import logo from "@src/assets/logo.png"
import { useWindow } from "@src/utils/hooks"

const CompasIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z"></path>
  </svg>
)

const CompasIconSolid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM15.5 8.5L10.5 10.5L8.5 15.5L13.5 13.5L15.5 8.5Z"></path>
  </svg>
)

const lg_links = [
  { name: "Home", href: "/", icon: <HomeIcon /> },
  { name: "Discover", href: "/discover", icon: <CompasIcon /> },
  { name: "Movies", href: "/movies", icon: <FilmIcon /> },
  { name: "Tv Shows", href: "/series", icon: <TvIcon /> },
  { name: "Reservation", href: "/reservation", icon: <TicketIcon /> },
  { name: "Your Stuff", href: "/stuff", icon: <BookmarkIcon /> },
]

const lg_solid_icons = [
  <HomeIconSolid />,
  <CompasIconSolid />,
  <FilmIconSolid />,
  <TvIconSolid />,
  <TicketIconSolid />,
  <BookmarkIconSolid />
]

const sm_links = [
  { name: "Tv Shows", href: "/series", icon: <TvIcon /> },
  { name: "Movies", href: "/movies", icon: <FilmIcon /> },
  { name: "Home", href: "/", icon: <HomeIcon /> },
  { name: "Discover", href: "/discover", icon: <CompasIcon /> },
  { name: "Tv Shows", href: "/#", icon: <Squares2X2Icon /> },
]

const sm_solid_icons = [
  <TvIconSolid />,
  <FilmIconSolid />,
  <HomeIconSolid />,
  <CompasIconSolid />,
  <Squares2X2IconSolid />
]

const sub_links = [
  { name: "Reservation", href: "/reservation", icon: <TicketIcon /> },
  { name: "Your Stuff", href: "/stuff", icon: <BookmarkIcon /> }
]

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { windowWidth } = useWindow()
  const submenuLinkRef = useRef()
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target
      const element = submenuLinkRef?.current
      if (!element?.contains(target)) {
        // console.log(isOpen) //! logs true
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <div className="sidenav">
      {windowWidth > 520 && (
        <div className="logo-wrapper">
          <Link to="/">
            <img src={logo} className="logo" />
          </Link>
          {/* <h5>Dad's movie app</h5> */}
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
                  <p className="link-tag">{link.name}</p>
                </Link>
            )})
          : sm_links.map((link, idx) => {
              const squaresIdx = sm_links.length - 1
              const isActive = location.pathname === link.href
              return (
                <Link
                  ref={squaresIdx === idx ? submenuLinkRef : null}
                  to={link.href}
                  key={link.href}
                  className={`link ${
                    isActive && "is-active"
                  }`}
                  onClick={() => { squaresIdx === idx && setIsOpen(!isOpen) }}
                >
                  <i className="icon">{isActive ? sm_solid_icons[idx] : link.icon}</i>
                  <p className="link-tag">{link.name}</p>
                  {isActive && <div className="dot"></div>}
                  {<AnimatePresence>
                    {squaresIdx === idx && isOpen && <SubMenu setIsOpen={setIsOpen} />}
                  </AnimatePresence>}
                </Link>
              )
            })}
      </nav>
      <div className="footer">Dad's best movie app <span>&trade;</span></div>
    </div>
  );
}

function SubMenu() {
  return (
    <motion.div 
      className="submenu"
      initial={{ y: 50, opacity: 0.6 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ 
        y: 60, opacity: 0.1,
        transition: { type: "tween", duration: 0.15 }
      }}
    >
      {sub_links.map(link =>
        <Link
          to={link.href}
          key={link.href}
          className="link sub-link"
        >
          <i className="icon">{link.icon}</i>
          <p className="link-tag">{link.name}</p>
        </Link>
      )}
    </motion.div>
  )
}