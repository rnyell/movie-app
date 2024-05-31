import { useRef, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { EqualizerIcon } from "@src/utils/icons"
import { useClickOutside } from "@utils/hooks"
import SortItems from "./sort-items"


export default function SortDropdown({ searchStateCopy, setSearchStateCopy }) {
  const [sortIsOpen, setSortIsOpen] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, handleClickOutside)

  function handleClickOutside() {
    if (sortIsOpen) setSortIsOpen(false)
  }

  return (
    <div
      className={`sort-dropdown ${sortIsOpen ? "is-open" : ""}`}
      ref={ref}
      onClick={() => setSortIsOpen(true)}
    >
      <p>Sort</p>
      <i className="icon"><EqualizerIcon /></i>
      <AnimatePresence>
        {sortIsOpen && (
          <SortItems
            searchStateCopy={searchStateCopy}
            setSearchStateCopy={setSearchStateCopy}
            setSortIsOpen={setSortIsOpen}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
