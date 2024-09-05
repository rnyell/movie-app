import { EqualizerIcon } from "@lib/ui/icons"
import { Dropdown } from "@lib/ui/components"
import SortItems from "./sort-items"
import { trigger_styles, menu_styles } from "../../../_utils"

export default function SortDropdown({ searchResults, setSearchResults, className }) {
  return (
    <Dropdown.Container className={className} strategy="portal">
      <Dropdown.Trigger className={trigger_styles}>
        <p>Sort</p>
        <i className="icon icon-sm">
          <EqualizerIcon />
        </i>
      </Dropdown.Trigger>
      <Dropdown.Menu className={menu_styles} placement="bottom/end" autoWidth>
        <SortItems searchResults={searchResults} setSearchResults={setSearchResults} />
      </Dropdown.Menu>
    </Dropdown.Container>
  )
}
