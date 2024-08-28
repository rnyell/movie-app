import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useUserContext } from "@src/store"
import { logOut } from "@lib/supabase/auth"
import { Presence } from "@lib/motion"
import {
  UserCircleIcon,
  ChevronUpDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/outline"
import { Dropdown } from "@lib/ui/components"
import cn from "@src/lib/ui/cn"

import { navLink_styles, menuItem_styles, menu_styles, tagMotion, tagTransition } from "./utils"


export default function UserPanel({ isCollapsed, className }) {
  const { userState } = useUserContext()
  const navigate = useNavigate()

  function getFirstName(fullName) {
    return fullName?.split(" ")[0]
  }

  const imgSrc = userState.isAnonymous
    ? "/avatars/anon.png"
    : `${userState.avatarUrl}`
  const user_name = userState.isAnonymous
    ? "Anonymous!"
    : getFirstName(userState.fullName)

  function handleLogout() {
    // TODO: for private routes it should navigate to "/" not all route e.g. "/search"
    navigate("/", { replace: true })
    logOut()
  }
  

  return (
    <Dropdown.Container className="mt-auto mb-2 data-[collapsed=true]:self-center" data-collapsed={isCollapsed}>
      <Dropdown.Trigger
        className={cn(
          navLink_styles,
          "py-3 align-center bg-primary-900 hover:bg-primary-700 rounded-3xl cursor-pointer",
          "data-[collapsed=true]:p-3 data-[collapsed=true]:outline data-[collapsed=true]:outline-[1.2px] data-[collapsed=true]:outline-primary-700"
        )}
        data-collapsed={isCollapsed}
      >
        <div className="size-9 shrink-0 relative outline outline-[1.5] outline-primary-600 outline-offset-2 rounded-full">
          <img className="w-100 rounded-full" src={imgSrc} />
          <span className="size-[5.75px] absolute bottom-[1.5px] right-[1.5px]  bg-[greenyellow] outline outline-[3] outline-primary-900 rounded-full" />
        </div>
        <Presence trigger={!isCollapsed}>
          <>
            <motion.p className="font-medium" {...tagMotion} transition={tagTransition}>
              {user_name}
            </motion.p>
            <i className="icon icon-md ml-auto">
              <ChevronUpDownIcon />
            </i>
          </>
        </Presence>
      </Dropdown.Trigger>
      <Dropdown.Menu className={menu_styles}>
        <Dropdown.MenuItem className={menuItem_styles} onClick={() => navigate("/account")}>
          <UserCircleIcon className="size-[1.125rem]" />
          <p>Account</p>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem className={`${menuItem_styles} text-[var(--color-red-600)]`} onClick={handleLogout}>
          <ArrowLeftStartOnRectangleIcon className="size-[1.125rem]" />
          <p>Logout</p>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}
