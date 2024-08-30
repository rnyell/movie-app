import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useThemeContext, useUserContext } from "@src/store"
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
import Settings from "./settings"


export default function UserPanel({ isCollapsed, appearance = "panel" }) {
  // appearance: "panle" | "button" | "avatar"
  const isButton = isCollapsed
  const isAvatar = appearance === "avatar"
  const placement = isAvatar ? "bottom/end" : isButton ? "top/start" : "top"
  const navigate = useNavigate()
  const { userState } = useUserContext()
  const { isMobile } = useThemeContext()

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
    <Dropdown.Container
      className="mt-auto mb-2 data-[collapsed=true]:self-center data-[appearance=avatar]:mt-0 data-[appearance=avatar]:mb-0"
      data-collapsed={isCollapsed}
      data-appearance={appearance}
    >
      <Dropdown.Trigger
        className={cn(
          navLink_styles,
          "py-3 align-center bg-primary-900 hover:bg-primary-700 rounded-3xl cursor-pointer",
          "data-[appearance=button]:p-3 data-[appearance=button]:outline data-[appearance=button]:outline-[1.2px] data-[appearance=button]:outline-primary-700",
          "data-[appearance=avatar]:p-2 data-[appearance=avatar]:bg-transparent"
        )}
        data-collapsed={isCollapsed}
        data-appearance={isCollapsed ? "button" : appearance}
      >
        <div
          className="size-9 shrink-0 relative outline outline-[1.5] outline-primary-600 outline-offset-2 rounded-full data-[appearance=avatar]:size-11"
          data-appearance={appearance}
        >
          <img className="w-100 rounded-full" src={imgSrc} />
          <span className="size-[5.75px] absolute bottom-[1.5px] right-[1.5px] bg-[greenyellow] outline outline-[3] outline-primary-900 rounded-full" />
        </div>
        {appearance !== "avatar" && (
          <Presence trigger={!isCollapsed}>
            <motion.p className="font-medium" {...tagMotion} transition={tagTransition}>
              {user_name}
            </motion.p>
            <i className="icon icon-md ml-auto">
              <ChevronUpDownIcon />
            </i>
          </Presence>
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu className={menu_styles} placement={placement}>
        <Dropdown.MenuItem className={menuItem_styles} onClick={() => navigate("/account")}>
          <UserCircleIcon className="size-[1.125rem]" />
          <p>Account</p>
        </Dropdown.MenuItem>
        {isMobile && (
          <Dropdown.MenuItem>
            <Settings loc="menu" />
          </Dropdown.MenuItem>
        )}
        <Dropdown.MenuItem className={`${menuItem_styles} text-[var(--color-red-600)]`} onClick={handleLogout}>
          <ArrowLeftStartOnRectangleIcon className="size-[1.125rem]" />
          <p>Logout</p>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}


function Avatar({ src, ...rest }) {
  return (
    <div
      className="size-9 shrink-0 relative outline outline-[1.5] outline-primary-600 outline-offset-2 rounded-full"
      {...rest}
    >
      <img className="w-100 rounded-full" src={imgSrc} />
      <span className="size-[5.75px] absolute bottom-[1.5px] right-[1.5px] bg-[greenyellow] outline outline-[3] outline-primary-900 rounded-full" />
      <div />
    </div>
  )
}
