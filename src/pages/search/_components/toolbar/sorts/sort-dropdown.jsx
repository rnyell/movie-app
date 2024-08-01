import { useRef, useState } from "react"
import { EqualizerIcon } from "@src/lib/ui/icons"
import { useClickOutside } from "@lib/hooks"
import { Presence } from "@src/lib/motion"
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
      <Presence trigger={sortIsOpen}>
        <SortItems
          searchStateCopy={searchStateCopy}
          setSearchStateCopy={setSearchStateCopy}
          setSortIsOpen={setSortIsOpen}
        />
      </Presence>
    </div>
  )
}
