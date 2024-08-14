import { useSearch } from "@src/store"
import { Divider } from "@lib/ui/components"
import FilterDropdown from "./filters/filter-dropdown"
import SortDropdown from "./sorts/sort-dropdown"
import SelectedFiltersBar from "./selected-filter-bar"


export default function SmFilter({ searchResults, setSearchResults }) {
  const {searchOptions} = useSearch()


  return (
    <>
      <div className="sm-filter">
        <div className="wrapper">
          <FilterDropdown
            setSearchResults={setSearchResults}
          />
          <SortDropdown
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </div>
      </div>
      {searchOptions.isFiltered && <SelectedFiltersBar setSearchResults={setSearchResults} />}
      <Divider space="md" width="almost-fill" />
    </>
  )
}
