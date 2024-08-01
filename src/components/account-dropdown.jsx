import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { getAuthUser, supabase } from "@src/lib/supabase/auth"
import { useClickOutside, useWindowOffsets, useLoader } from "@lib/hooks"
import { useAuth } from "@src/auth/auth-context"
import { Presence } from "@src/lib/motion"
import {
    UserCircleIcon,
    ChevronUpDownIcon,
    ArrowLeftStartOnRectangleIcon
} from "@heroicons/outline"

const dropdown_options = [
  { tag: "Account", href: "/account", icon: <UserCircleIcon />  },
  { tag: "Log Out", href: null, icon: <ArrowLeftStartOnRectangleIcon />  },
]


export default function AccountDropdown({ isCollapsed }) {
  const { session } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useClickOutside(ref, () => setShowDropdown(false))
  
  const { data: user, isLoading, error } = useLoader(getAuthUser)

  function handleLogin() {
    navigate("/login")
  }


  if (session) {
    const isAnonymous = session.user?.is_anonymous
    const imgSrc = isAnonymous ? "/avatars/anon.png" : `${user?.user_metadata?.avatar_url}`
    const userName = isAnonymous ? "Anonymous!" : user?.user_metadata?.name?.split(" ")[0]

    return (
      <div
        className="account-dropdown"
        ref={ref}
        onClick={() => setShowDropdown(true)}
      >
        <div className="user-avatar relative">
          <img src={imgSrc} />
          <span className="user-status absolute rounded-full" />
        </div>
        {!isCollapsed && (
          <>
            <p className="user-name">{userName}</p>
            <i className="icon icon-md ml-auto">
              <ChevronUpDownIcon />
            </i>
          </>
        )}
        <Presence trigger={showDropdown}>
          <AccountOptions setShowDropdown={setShowDropdown} />
        </Presence>
      </div>
    )
  } else {
    return (
      <button
        className="link"
        type="button"
        data-login
        onClick={handleLogin}
      >
        <i className="icon icon-md">
          <UserCircleIcon />
        </i>
        <p className="link-tag">Log In</p>
      </button>
    )
  }
}


function AccountOptions({ setShowDropdown }) {
  const navigate = useNavigate()
  const {windowWidth} = useWindowOffsets()
  const isDesktop = windowWidth > 520

  function handleLogout() {
    navigate("/")
    supabase.auth.signOut()
  }

  const variants = {
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
      className="account-dropdown-options flex-col absolute"
      data-submenu
      {...variants}
    >
      {dropdown_options.map(opt => {
        const isProfile = opt.tag === "Account"
        const isLogout = opt.tag === "Log Out"

        function handleClick() {
          if (isLogout) {
            // setShowDropdown(false) //? not working
            handleLogout()
          } else if (isProfile) {
            // setShowDropdown(false)
            navigate("/account")
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
