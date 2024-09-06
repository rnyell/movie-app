import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
// import { motion } from "framer-motion"
import { useThemeContext } from "@src/store"
import { useAuth } from "@src/auth/auth-context"
// import { Presence } from "@lib/motion"
import { Button, Dropdown } from "@lib/ui/components"
import { BellIcon, UserCircleIcon } from "@heroicons/outline"
import SearchBox from "./search-box"
// import SideMenu from "../menus/sidemenu"
import UserPanel from "../menus/user-panel"
import { menu_styles } from "../menus/utils"

import "./header.css"

const datasetInitial = {
  position: "static",
  variant: "default",
}

export default function Header({ withSearchbox = true }) {
  const { isLoggedIn } = useAuth()
  const { isMobile } = useThemeContext()
  const { pathname } = useLocation()
  const [dataset, setDataset] = useState(datasetInitial)
  // const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (pathname === "/") {
      setDataset({ variant: "default", position: "static" })
    } else if (pathname.startsWith("/search")) {
      if (withSearchbox) {
        setDataset({ variant: "stretched", position: "sticky" })
      } else {
        setDataset({ variant: "animated", position: "sticky" })
      }
    } else if (pathname.startsWith("/movies") || pathname.startsWith("/series")) {
      setDataset({ variant: "transparent", position: "absolute" })
    } else {
      setDataset({ variant: "default", position: "sticky" })
    }
  }, [pathname])

  return (
    <header className="main-header align-center" data-variant={dataset.variant} data-position={dataset.position}>
      {/* {(dataset.variant === "stretched" || dataset.variant === "animated") && (
        <HamberIcon setOpen={setOpen} isOpen={isOpen} />
      )} */}
      <div className="search-box-wrapper shrink-0 min-w-0">
        <SearchBox variant={dataset.variant} />
      </div>
      <div className="icons align-center gap-[0.325rem]">
        <div className="notif-icon">
          <Notification />
        </div>
        <div className="user-icon">
          {isMobile &&
            (isLoggedIn ? (
              <UserPanel appearance="avatar" />
            ) : (
              <Link to="/login">
                <Button
                  variants="ghost"
                  size="square-md"
                  iconOnly
                  iconSize="xxl"
                  svg={<UserCircleIcon />}
                  customStyles="rounded-full color-neutral-300"
                />
              </Link>
            ))}
        </div>
      </div>
      {/* <Presence trigger={isOpen}>
        <SideMenu setOpen={setOpen} />
      </Presence> */}
    </header>
  )
}

// function HamberIcon({ setOpen, isOpen }) {
//   const icon_styles = {
//     position: "relative",
//     gap: 1,
//   }

//   const line_styles = {
//     borderRadius: 10,
//     backgroundColor: "var(--color-neutral-300)",
//     transformOrigin: "center",
//   }

//   return (
//     <i
//       className="icon flex-col-center cursor-pointer"
//       style={icon_styles}
//       onClick={() => setOpen(!isOpen)}
//     >
//       <motion.span
//         className="line"
//         style={{ ...line_styles, height: 1.5, width: 20, y: -1 }}
//         animate={isOpen ? { rotateZ: 45, y: 1 } : { rotateZ: 0 }}
//       />
//       <motion.span
//         className="line"
//         style={{
//           ...line_styles,
//           marginRight: "auto",
//           height: 1.5,
//           width: 16,
//           y: 1.5,
//         }}
//         animate={isOpen ? { rotateZ: -45, width: 20, y: -1.5 } : { rotateZ: 0 }}
//       />
//     </i>
//   )
// }

function Notification() {
  return (
    <Dropdown.Container strategy="portal">
      <Dropdown.Trigger>
        <Button
          variants="ghost"
          size="square-md"
          iconOnly
          iconSize="xxl"
          svg={<BellIcon />}
          customStyles="rounded-full color-neutral-300"
        />
      </Dropdown.Trigger>
      <Dropdown.Menu className={`${menu_styles} p-4`} placement="bottom/end">
        Wow, such empty!
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}