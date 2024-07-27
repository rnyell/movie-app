import { useSearch } from "@src/store"
import { Divider } from "@src/lib/ui/components"
import FilterDropdown from "./filters/filter-dropdown"
import SortDropdown from "./sorts/sort-dropdown"
import SelectedFiltersBar from "./selected-filter-bar"


export default function SmFilter({ searchStateCopy, setSearchStateCopy }) {
  const {searchOptions} = useSearch()


  return (
    <>
      <div className="sm-filter">
        <div className="wrapper">
          <FilterDropdown
            setSearchStateCopy={setSearchStateCopy}
          />
          <SortDropdown
            searchStateCopy={searchStateCopy}
            setSearchStateCopy={setSearchStateCopy}
          />
        </div>
      </div>
      {searchOptions.isFiltered && <SelectedFiltersBar setSearchStateCopy={setSearchStateCopy} />}
      <Divider space="md" width="almost-fill" />
    </>
  )
}
