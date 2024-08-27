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
import { Dropdown } from "@lib/ui/components"
import { navLink_styles, NavTag } from "./navigation"


export default function Settings({ isCollapsed }) {
  return (
    <Dropdown.Container>
      <Dropdown.Trigger className={navLink_styles}>
        <i className="icon icon-md"><CogIcon /></i>
        <NavTag tag="Settings" isCollapsed={isCollapsed} />
        {!isCollapsed && <i className="icon ml-auto"><ChevronDownIcon /></i>}
      </Dropdown.Trigger>
      <Dropdown.Menu className="rounded-3xl" >
        <Dropdown.MenuItem style={{all: "unset"}}>
          <Themes />
        </Dropdown.MenuItem>
        <Dropdown.MenuItem>
          <i className="icon icon-md"><QuestionMarkCircleIcon /></i>
          <p>FAQ</p>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem onClick={() => window.open("https://github.com/rnyell/movie-app", "_blank", "noopener, noreferrer")}>
          <i className="icon icon-md"><CommandLineIcon /></i>
          <p>Contribute</p>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem onClick={() => window.open("https://t.me/", "_blank", "noopener, noreferrer")}>
          <i className="icon icon-md"><BugIcon /></i>
          <p>Report Issues</p>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}


function Themes() {
  const { preferences, prefDispatch } = useThemeContext()

  function handleChange(e) {
    if (!e.target.checked) {
      prefDispatch({ type: "change_theme", theme: "light" })
    } else {
      prefDispatch({ type: "change_theme", theme: "dark" })
    }
  }

  return (
    <Dropdown.Container>
      <Dropdown.Trigger className={navLink_styles}>
        <i className="icon icon-md"><Palette /></i>
        <p>Appearance</p>
        <i className="icon icon-xs ml-auto"><ChevronRightIcon /></i>
      </Dropdown.Trigger>
      <Dropdown.Menu className="rounded-3xl" isNested position={{v: "bottom", h: "right"}}>
        <Dropdown.MenuItem>
          <p>Theme</p>
          <label className="h-full grow" htmlFor="mode">
            <span className="checkbox">
              <i className="icon icon-xs">
                {preferences.theme === "dark" ? <MoonIcon /> : <SunIcon />}
              </i>
              <input
                type="checkbox"
                name="theme"
                id="mode"
                checked={preferences.theme === "dark"}
                onChange={handleChange}
              />
            </span>
          </label>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem>
          <p>Accent</p>
          <div>
            <label htmlFor="accent-1">
              <input type="radio" name="accent" id="accent-1" />
            </label>
            <label htmlFor="accent-2">
              <input type="radio" name="accent" id="accent-2" />
            </label>
          </div>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}
