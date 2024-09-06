import { Dropdown } from "@lib/ui/components"
import { FunnelIcon } from "@heroicons/outline"
import FilterItems from "./filter-items"
import { trigger_styles, menu_styles } from "../../../_utils"

export default function FilterDropdown({ setSearchResults }) {
  return (
    <Dropdown.Container>
      <Dropdown.Trigger className={trigger_styles}>
        <p>Filters</p>
        <i className="icon icon-md">
          <FunnelIcon />
        </i>
      </Dropdown.Trigger>
      <Dropdown.Menu className={menu_styles} placement="bottom/start" autoWidth>
        <FilterItems setSearchResults={setSearchResults} />
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}
