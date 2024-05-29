import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
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
import { CompasIconSolid, CompasIcon } from "@src/utils/icons"
import { useWindowOffsets } from "@utils/hooks"
import logo from "@src/assets/logo.png"


const lg_links = [
  { name: "Home", href: "/", icon: <HomeIcon /> },
  { name: "Discover", href: "/discover", icon: <CompasIcon /> },
  { name: "Movies", href: "/discover/movies", icon: <FilmIcon /> },
  { name: "TV Shows", href: "/discover/series", icon: <TvIcon /> },
  { name: "Reservation", href: "/reservation", icon: <TicketIcon /> },
  { name: "Library", href: "/library", icon: <BookmarkIcon /> },
]

const sm_links = [
  { name: "TV Shows", href: "/discover/series", element: Link, icon: <TvIcon /> },
  { name: "Movies", href: "/discover/movies", element: Link, icon: <FilmIcon /> },
  { name: "Home", href: "/", element: Link, icon: <HomeIcon /> },
  { name: "Discover", href: "/discover", element: Link, icon: <CompasIcon /> },
  { name: "", href: null, element: "div", icon: <Squares2X2Icon /> },
]

const sub_links = [
  { name: "Reservation", href: "/reservation", icon: <TicketIcon /> },
  { name: "Library", href: "/library", icon: <BookmarkIcon /> }
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


export function SideNav() {
  const {windowWidth} = useWindowOffsets()
  const [showSubMenu, setShowSubMenu] = useState(false)
  const submenuLinkRef = useRef()
  const location = useLocation()
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target
      const element = submenuLinkRef?.current
      if (!element?.contains(target)) {
        // console.log(showSubMenu) //! logs true
        setShowSubMenu(false)
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
                  <p className="link-tag">{link.name}</p>
                  {isActive && <div className="indicator-dot" />}
                  {<AnimatePresence>
                    {isSquares && showSubMenu && <SubMenu setShowSubMenu={setShowSubMenu} />}
                  </AnimatePresence>}
                </Element>
              )
            })}
      </nav>
      <div className="footer unselectable">Dad's best movie app <span>&trade;</span></div>
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
          <p className="link-tag">{link.name}</p>
        </Link>
      )}
    </motion.div>
  )
}

export function SideMenu({ setIsOpen }) {
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
      <motion.div
        className="side-menu"
        initial={{x: "-100%", opacity: 0.65}}
        animate={{x: 0, opacity: 1}}
        exit={{x: "-100%", opacity: 0.7}}
        transition={{duration: 0.35, type: "spring"}}
      >
        <div className="logo-wrapper align-center">
          <img src={logo} className="logo" />
        </div>
        <nav className="menu-links">
          <div className="group group-1 flex-col">
            {lg_links.slice(0, 4).map(link => (
              <Link
                className="link"
                key={link.href}
                to={link.href}
              >
                <i className="icon">{link.icon}</i>
                <p className="link-tag">{link.name}</p>
              </Link>
            ))}
          </div>
          <hr />
          <div className="group group-2 flex-col">
            {lg_links.slice(4, 6).map(link => (
              <Link
                className="link"
                key={link.href}
                to={link.href}
              >
                <i className="icon">{link.icon}</i>
                <p className="link-tag">{link.name}</p>
              </Link>
            ))}
          </div>
          <div className="empty-link" />
          <div className="footer unselectable">
            <span>Dad's Best Movie App</span>
          </div>
        </nav>
      </motion.div>
    </>,
    document.getElementById("portal")
  )
}
