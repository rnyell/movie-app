import { useWindowOffsets } from "@lib/hooks"
import SideFilter from "./side-filter"
import FilterBar from "./filterbar"

export default function FilterBox({ searchResults, setSearchResults }) {
  const { windowWidth } = useWindowOffsets()

  return (
    windowWidth >= 620 ? (
      <SideFilter
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
    ) : (
      <FilterBar
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
    )
  )
}
