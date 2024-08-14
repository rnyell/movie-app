import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { getAuthUser, supabase } from "@lib/supabase/auth"
import { useClickOutside, useWindowOffsets, useLoader } from "@lib/hooks"
import { useAuth } from "@src/auth/auth-context"
import { Presence } from "@lib/motion"
import {
  UserCircleIcon,
  ChevronUpDownIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/outline"
import { NavLink, tagMotion, tagTransition } from "./menus/navigation"

import "./account-menu.css"

const dropdown_options = [
  { tag: "Account", href: "/account", icon: <UserCircleIcon />  },
  { tag: "Log Out", href: null, icon: <ArrowLeftStartOnRectangleIcon />  },
]


export default function AccountMenu({ isCollapsed = false }) {
  const { session } = useAuth()
  const [isOpen, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useClickOutside(ref, () => setOpen(false))
  
  const { data: user, isLoading, error } = useLoader(getAuthUser)

  function handleLogin() {
    navigate("/login")
  }

  if (session) {
    const isAnonymous = session.user?.is_anonymous
    const imgSrc = isAnonymous ? "/avatars/anon.png" : `${user?.user_metadata?.avatar_url}`
    const userName = isAnonymous ? "Anonymous!" : user?.user_metadata?.name?.split(" ")[0]

    return (
      <div className="account-menu" ref={ref} onClick={() => setOpen(true)}>
        <div className="user-avatar relative">
          <img src={imgSrc} />
          <span className="user-status absolute rounded-full" />
        </div>
        <Presence trigger={!isCollapsed}>
          <motion.p className="user-name" {...tagMotion} transition={tagTransition}>{userName}</motion.p>
          <i className="icon icon-md ml-auto">
            <ChevronUpDownIcon />
          </i>
        </Presence>
        <Presence trigger={isOpen}>
          <AccountMenuOptions setOpen={setOpen} />
        </Presence>
      </div>
    )
  } else {
    return (
      <NavLink
        type="button"
        href={null}
        icon={<UserCircleIcon />}
        tag="Log In"
        isCollapsed={isCollapsed}
        data-login
        onClick={handleLogin}
      />
    )
  }
}


function AccountMenuOptions({ setOpen }) {
  const { windowWidth } = useWindowOffsets()
  const isDesktop = windowWidth > 520
  const navigate = useNavigate()

  function handleLogout() {
    navigate("/")
    supabase.auth.signOut()
  }

  const optionsMotion = {
    initial: {
      opacity: 0.5,
      y: isDesktop ? 25 : -20,
      x: isDesktop ? 0 : 5,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
    },
    exit: {
      opacity: 0,
      y: isDesktop ? 25 : -20,
      x: isDesktop ? 0 : 5,
    }
  }

  return (
    <motion.ul
      className="account-menu-options flex-col absolute"
      data-submenu
      {...optionsMotion}
    >
      {dropdown_options.map(opt => {
        const isProfile = opt.tag === "Account"
        const isLogout = opt.tag === "Log Out"

        function handleClick(e) {
          e.stopPropagation()
          if (isLogout) {
            setOpen(false)
            handleLogout()
          } else if (isProfile) {
            navigate("/account")
            setOpen(false)
          }
        }

        return (
          <li
            className="option flex"
            data-submenu-item
            key={opt.tag}
            onClick={handleClick}
          >
            <i className="icon">{opt.icon}</i>
            <p className="tag">{opt.tag}</p>
          </li>
        )
      })}
    </motion.ul>
  )
}
