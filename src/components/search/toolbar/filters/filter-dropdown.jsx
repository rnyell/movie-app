import { useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { FunnelIcon } from "@heroicons/outline"
import { useClickOutside } from "@utils/hooks"
import FilterItems from "./filter-items"


export default function FilterDropdown({setSearchStateCopy}) {
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
      <AnimatePresence>
        {filterIsOpen && (
          <FilterItems 
            setSearchStateCopy={setSearchStateCopy}
            setFilterIsOpen={setFilterIsOpen}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
