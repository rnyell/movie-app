import { useRef, useState } from "react"
import { FunnelIcon } from "@heroicons/outline"
import { useClickOutside } from "@lib/hooks"
import { Presence } from "@lib/motion"
import FilterItems from "./filter-items"


export default function FilterDropdown({setSearchResults}) {
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const ref = useRef(null)
  
  useClickOutside(ref, handleClickOutside)

  function handleClickOutside() {
    if (filterIsOpen) setFilterIsOpen(false)
  }


  return (
    <div
      className={`filter-dropdown ${filterIsOpen && "is-open"}`}
      ref={ref}
      onClick={() => setFilterIsOpen(true)}
    >
      <p>Filters</p>
      <i className="icon"><FunnelIcon /></i>
      <Presence trigger={filterIsOpen}>
        <FilterItems 
          setSearchResults={setSearchResults}
          setFilterIsOpen={setFilterIsOpen}
        />
      </Presence>
    </div>
  )
}
