import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useThemeContext, useUserContext } from "@src/store"
import { logOut } from "@lib/supabase/auth"
import { Presence } from "@lib/motion"
import { Dropdown, Avatar } from "@lib/ui/components"
import cn from "@lib/ui/cn"
import {
  UserCircleIcon,
  ChevronUpDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/outline"
import Settings from "./settings"
import {
  navLink_styles,
  menuItem_styles,
  menu_styles,
  tagMotion,
  tagTransition,
} from "./utils"

export default function UserPanel({ isCollapsed, appearance = "panel" }) {
  // appearance: "panel" | "button" | "avatar"
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
      strategy="portal"
      data-collapsed={isCollapsed}
      data-appearance={appearance}
    >
      <Dropdown.Trigger
        className={cn(
          navLink_styles,
          "py-3 align-center gap-0 bg-primary-900 hover:bg-primary-700 rounded-3xl cursor-pointer lg:px-3",
          "data-[appearance=button]:p-3 data-[appearance=button]:outline data-[appearance=button]:outline-[1.2px] data-[appearance=button]:outline-primary-700",
          "data-[appearance=avatar]:p-2 data-[appearance=avatar]:bg-transparent",
        )}
        data-collapsed={isCollapsed}
        data-appearance={isCollapsed ? "button" : appearance}
      >
        <Avatar
          className="size-9 data-[appearance=avatar]:size-10"
          data-appearance={appearance}
          src={imgSrc}
        />
        {appearance !== "avatar" && (
          <Presence trigger={!isCollapsed}>
            <motion.div className="pl-3 w-max sm:px-2" {...tagMotion} transition={tagTransition}>
              <p className="w-max font-medium">{user_name}</p>
              <p className="w-[85%] truncate text-[0.575rem] font-semibold text-gray-500">alan321dl@gmail.com</p>
            </motion.div>
            <i className="icon icon-md ml-auto absolute-y-center right-2">
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
        <Dropdown.MenuItem
          className={`${menuItem_styles} text-[var(--color-red-600)]`}
          onClick={handleLogout}
        >
          <ArrowLeftStartOnRectangleIcon className="size-[1.125rem]" />
          <p>Logout</p>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}
