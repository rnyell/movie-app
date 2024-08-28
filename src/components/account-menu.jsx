import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useThemeContext, useUserContext } from "@src/store"
import { logOut } from "@lib/supabase/auth"
import { useClickOutside } from "@lib/hooks"
import { Presence } from "@lib/motion"
import {
  UserCircleIcon,
  ChevronUpDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/outline"
import { navLink_styles, tagMotion, tagTransition } from "./menus/navigation"

import cn from "@src/lib/ui/cn"
import "./account-menu.css"

const dropdown_options = [
  { tag: "Account", href: "/account", icon: <UserCircleIcon /> },
  { tag: "Log Out", href: null, icon: <ArrowLeftStartOnRectangleIcon /> },
]

export default function AccountMenu({ isCollapsed = false, className }) {
  const { userState } = useUserContext()
  const [isOpen, setOpen] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, () => setOpen(false))

  function getFirstName(fullName) {
    return fullName?.split(" ")[0]
  }

  const imgSrc = userState.isAnonymous
    ? "/avatars/anon.png"
    : `${userState.avatarUrl}`
  const user_name = userState.isAnonymous
    ? "Anonymous!"
    : getFirstName(userState.fullName)

  return (
    <div
      className={`account-menu ${cn(
        navLink_styles,
        `mt-auto mb-2 py-3 align-center relative hover:bg-primary-700 rounded-3xl cursor-pointer
        data-[collapsed=true]:p-3 data-[collapsed=true]:self-center`,
        className,
      )}`}
      ref={ref}
      data-collapsed={isCollapsed}
      onClick={() => setOpen(true)}
    >
      <div className="user-avatar size-9 shrink-0 relative outline outline-[1.5] outline-primary-600 rounded-full">
        <img className="w-100 rounded-full" src={imgSrc} />
        <span
          className="
            size-[5.75px] absolute bottom-[1.5px] right-[1.5px] 
          bg-[greenyellow] outline outline-[3] outline-primary-900 rounded-full"
        />
      </div>
      <Presence trigger={!isCollapsed}>
        <>
          <motion.p {...tagMotion} transition={tagTransition}>
            {user_name}
          </motion.p>
          <i className="icon icon-md ml-auto">
            <ChevronUpDownIcon />
          </i>
        </>
      </Presence>
      <Presence trigger={isOpen}>
        <AccountMenuOptions setOpen={setOpen} />
      </Presence>
    </div>
  )
}

function AccountMenuOptions({ setOpen, position }) {
  const { isMobile } = useThemeContext()
  const navigate = useNavigate()

  function handleLogout() {
    // TODO: for private routes it should navigate to "/" not all route e.g. "/search"
    navigate("/", { replace: true })
    logOut()
  }

  const optionsMotion = {
    initial: {
      opacity: 0.5,
      y: isMobile ? -20 : 25,
      x: isMobile ? 5 : 0,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
    },
    exit: {
      opacity: 0,
      y: isMobile ? -20 : 25,
      x: isMobile ? 5 : 0,
    },
  }

  return (
    <motion.ul
      className="account-menu-options flex-col absolute"
      data-menu
      {...optionsMotion}
    >
      {dropdown_options.map((option) => {
        const isProfile = option.tag === "Account"
        const isLogout = option.tag === "Log Out"

        function handleClick(e) {
          e.stopPropagation()
          if (isLogout) {
            handleLogout()
            setOpen(false)
          } else if (isProfile) {
            navigate("/account")
            setOpen(false)
          }
        }

        return (
          <li
            className="option flex"
            data-menu-item
            key={option.tag}
            onClick={handleClick}
          >
            <i className="icon">{option.icon}</i>
            <p className="tag">{option.tag}</p>
          </li>
        )
      })}
    </motion.ul>
  )
}
