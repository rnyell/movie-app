import { useSearch } from "@src/store/search-context"
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
      <hr style={{marginBlock: "1rem"}} />
    </>
  )
}
