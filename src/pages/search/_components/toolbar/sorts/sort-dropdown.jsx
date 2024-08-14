import { useRef, useState } from "react"
import { EqualizerIcon } from "@lib/ui/icons"
import { useClickOutside } from "@lib/hooks"
import { Presence } from "@lib/motion"
import SortItems from "./sort-items"


export default function SortDropdown({ searchResults, setSearchResults }) {
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
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setSortIsOpen={setSortIsOpen}
        />
      </Presence>
    </div>
  )
}
