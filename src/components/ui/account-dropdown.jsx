import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  UserCircleIcon,
  ChevronUpDownIcon,
  ArrowLeftStartOnRectangleIcon,
  BookmarkIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
} from "@heroicons/outline"
import { supabase } from "@src/auth/supabase"
import { useClickOutside, useWindowOffsets } from "@src/utils/hooks"
import { useUserContext } from "@src/store/user-context"

const dropdown_options = [
  { tag: "Account", href: "/account", icon: <UserCircleIcon />  },
  { tag: "Log Out", href: null, icon: <ArrowLeftStartOnRectangleIcon />  },
]


export default function AccountDropdown() {
  const {session} = useUserContext()
  const [userData, setUserData] = useState({})
  const [showDropdown, setShowDropdown] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, handleClickOutside)

  useEffect(() => {
    adjustUserData()
  }, [session])

  async function adjustUserData() {
    const { data: {user} } = await supabase.auth.getUser()
    setUserData(user)
  }

  function handleClickOutside() {
    setShowDropdown(false)
  }

  function handleLogin() {
    supabase.auth.signInWithOAuth({ provider: "google" })
  }


  if (session) {
    return (
      <div
        className="account-dropdown"
        role="button"
        ref={ref}
        onClick={() => setShowDropdown(true)}
      >
        <img className="user-avatar" src={userData?.user_metadata?.avatar_url} />
        <p className="user-name">{userData?.user_metadata?.name?.split(" ")[0]}</p>
        <i className="icon">
          <ChevronUpDownIcon />
        </i>
        <AnimatePresence>
          {showDropdown && <AccountOptions setShowDropdown={setShowDropdown} />}
        </AnimatePresence>
      </div>
    )
  } else {
    return (
      <button
        className="link"
        type="button"
        onClick={handleLogin}
      >
        <i className="icon">
          <UserCircleIcon />
        </i>
        <p className="link-tag">Log In</p>
      </button>
    )
  }
}


function AccountOptions({ setShowDropdown }) {
  const {windowWidth} = useWindowOffsets()
  const navigate = useNavigate()

  function handleLogout() {
    supabase.auth.signOut()
  }

  const variants = {
    initial: {
      opacity: 0.5,
      y: windowWidth > 520 ? 25 : -20,
      x: windowWidth > 520 ? 0 : 5,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
    },
    exit: {
      opacity: 0,
      y: windowWidth > 520 ? 25 : -20,
      x: windowWidth > 520 ? 0 : 5,
    }
  }

  return (
    <motion.div
      className="account-dropdown-options absolute"
      {...variants}
    >
      <ul className="options flex-col">
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
              key={opt.tag}
              onClick={handleClick}
            >
              <i className="icon">{opt.icon}</i>
              <p className="tag">{opt.tag}</p>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}
