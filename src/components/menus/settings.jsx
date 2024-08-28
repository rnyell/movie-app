import { useThemeContext } from "@src/store"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CommandLineIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon as CogIcon,
} from "@heroicons/outline"
import { MoonIcon, SunIcon } from "@heroicons/solid"
import { BugIcon, Palette } from "@lib/ui/icons"
import cn from "@lib/ui/cn"
import { Dropdown } from "@lib/ui/components"
import { NavTag } from "./navigation"
import { navLink_styles, menu_styles, menuItem_styles } from "./utils"


export default function Settings({ isCollapsed }) {
  function navigateBlank(url) {
    window.open(url, "_blank", "noopener, noreferrer")
  }

  return (
    <Dropdown.Container className="data-[collapsed=true]:self-center" data-collapsed={isCollapsed}>
      <Dropdown.Trigger className={navLink_styles}>
        <i className="icon icon-md"><CogIcon /></i>
        <NavTag tag="Settings" isCollapsed={isCollapsed} />
        {!isCollapsed && <i className="icon ml-auto"><ChevronDownIcon /></i>}
      </Dropdown.Trigger>
        {/* styles for collapsed sidenav. dropped cuz of complexity */}
        {/* the `-right-[12.25rem]` is totally a magic number
        className="data-[collapsed=true]:!left-auto data-[collapsed=true]:!-right-[12.25rem]"
        data-collapsed={isCollapsed}
        position={isCollapsed ? {v: "align-top", h: "right"} : {v: "bottom", h: null}} */}
      <Dropdown.Menu className={menu_styles}>
        <Dropdown.MenuItem style={{all: "unset"}}>
          <Themes />
        </Dropdown.MenuItem>
        <Dropdown.MenuItem className={menuItem_styles}>
          <i className="icon icon-md"><QuestionMarkCircleIcon /></i>
          <p>FAQ</p>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem className={menuItem_styles} onClick={() => navigateBlank("https://github.com/rnyell/movie-app")}>
          <i className="icon icon-md"><CommandLineIcon /></i>
          <p>Contribute</p>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem className={menuItem_styles} onClick={() => navigateBlank("https://t.me/")}>
          <i className="icon icon-md"><BugIcon /></i>
          <p>Report Issues</p>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}


function Themes() {
  const { preferences, prefDispatch } = useThemeContext()

  const common_styles = "size-[22px] relative block bg-primary-200 rounded-full bg-gradient-to-br"
  const checked_styles = "content-[''] before:size-[12px] before:absolute-center before:bg-slate-50 before:rounded-full"

  function handleThemeChange(e) {
    if (!e.target.checked) {
      prefDispatch({ type: "change_theme", theme: "light" })
    } else {
      prefDispatch({ type: "change_theme", theme: "dark" })
    }
  }

  function handleAccentChange(e) {
    const accent = e.target.value
    prefDispatch({ type: "change_accent", accent })
  }

  return (
    <Dropdown.Container>
      <Dropdown.Trigger className={`${navLink_styles} text-primary-200 hover:text-unset hover:bg-primary-700`}>
        <i className="icon icon-md"><Palette /></i>
        <p>Appearance</p>
        <i className="icon icon-xs ml-auto"><ChevronRightIcon /></i>
      </Dropdown.Trigger>
      <Dropdown.Menu className={menu_styles} isNested position={{v: "bottom", h: "right"}}>
        <Dropdown.MenuItem className={`${menuItem_styles} py-0 gap-0`}>
          <p>Theme</p>
          <label className="p-3 h-full grow align-center" htmlFor="mode">
            <span className="ml-auto w-[48px] aspect-[2] relative bg-primary-600 rounded-3xl outline outline-1 outline-primary-500 transition-bg">
              <input
                className="peer sr-only"
                type="checkbox"
                name="theme"
                id="mode"
                checked={preferences.theme === "dark"}
                onChange={handleThemeChange}
              />
              <i className={`
                h-[86%] aspect-square absolute-y-center left-[3px] text-primary-800 bg-primary-200 rounded-full
                transition-[transform,bg] duration-200 peer-checked:translate-x-full
              `}>
                {preferences.theme === "dark" ? <MoonIcon /> : <SunIcon />}
              </i>
            </span>
          </label>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem className={`${menuItem_styles} pb-0 flex-col !items-start gap-0`}>
          <p>Accent Color</p>
          <div className="py-3 w-full align-center">
            <label className="grow align-center-col cursor-pointer gap-1" htmlFor="plum">
              <input
                className="peer sr-only"
                type="radio"
                name="accent"
                id="plum"
                value="plum"
                checked={preferences.accent === "plum"}
                onChange={handleAccentChange}
              />
              <span className={cn(
                `${common_styles} from-[#D3546A] to-[#A72A4B]`,
                { [checked_styles]: preferences.accent === "plum" }
                )} />
              <p className="text-[85%] text-primary-300">Plum</p>
            </label>
            <label className="grow align-center-col cursor-pointer gap-1" htmlFor="violet">
              <input
                className="peer sr-only"
                type="radio"
                name="accent"
                id="violet"
                value="violet"
                checked={preferences.accent === "violet"}
                onChange={handleAccentChange}
              />
              <span className={cn(
                `${common_styles} from-[#7c3aed] to-[#4c1d95]`,
                {[checked_styles]: preferences.accent === "violet"}
              )} />
              <p className="text-[85%] text-primary-300">Violet</p>
            </label>
            <label className="grow align-center-col cursor-pointer gap-1" htmlFor="indigo">
              <input
                className="peer sr-only"
                type="radio"
                name="accent"
                id="indigo"
                value="indigo"
                checked={preferences.accent === "indigo"}
                onChange={handleAccentChange}
              />
              <span className={cn(
                `${common_styles} from-[#6366F1] to-[#3730A3]`,
                { [checked_styles]: preferences.accent === "indigo" }
                )} />
              <p className="text-[85%] text-primary-300">Indigo</p>
            </label>
          </div>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}
