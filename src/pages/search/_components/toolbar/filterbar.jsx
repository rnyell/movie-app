import { ALL_GENRES } from "@services"
import { useSearch } from "@src/store"
import { Divider } from "@lib/ui/components"
import { XMarkIcon } from "@heroicons/outline"
import FilterDropdown from "./filters/filter-dropdown"
import SortDropdown from "./sorts/sort-dropdown"
import { sortResults, filterResults } from "../../_utils"

export default function FilterBar({ searchResults, setSearchResults }) {
  const { searchOptions } = useSearch()
  //? is it reactvie enough? or useLocation w useSearchParams
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("query")

  if (query) {
    return (
      <div>
        <h2 className="heading">
          Results for:{" "}
          <span className="searched-title">
            {query?.replaceAll("-", " ")}
          </span>
        </h2>
        <div className="mt-6 inline-flex gap-2">
          <FilterDropdown setSearchResults={setSearchResults} />
          <SortDropdown
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </div>
        {searchOptions.isFiltered && (
          <SelectedFilters setSearchResults={setSearchResults} />
        )}
        <Divider space="md" width="almost-fill" />
      </div>
    )
  }
}


function SelectedFilters({ setSearchResults }) {
  const {searchState, searchOptions, optionsDispatch} = useSearch()

  function handleRemovedFilters({removed, value}) {
    const initialResults = searchState.results

    if (removed === "type") {
      optionsDispatch({ type: "set_type", media: "all" })
      const currentGenres = searchOptions.filters.genres
      const {results, pages} = filterResults(initialResults, "all", currentGenres)
      const sortby = searchOptions.sorts.sortby
      const order = searchOptions.sorts.order
      const sortedResults = sortResults(results, sortby, order)
      setSearchResults({results: sortedResults, pages})
    }

    if (removed === "genre") {
      const selectedType = searchOptions.filters.type
      const previousGenres = searchOptions.filters.genres
      const currentGenres = previousGenres.filter(genreId => genreId !== value)
      optionsDispatch({ type: "set_genres", ids: currentGenres })
      const {results, pages} = filterResults(initialResults, selectedType, currentGenres)
      const sortby = searchOptions.sorts.sortby
      const order = searchOptions.sorts.order
      const sortedResults = sortResults(results, sortby, order)
      setSearchResults({results: sortedResults, pages})
    }
  }

  return (
    <div className="selected-filters mt-6 flex">
      {searchOptions.filters.type !== "all" ? (
        <div className="selected-type flex">
          <span className="align-center">
            <b>{searchOptions.filters.type}</b>
            <i className="icon ::before-abs" onClick={() => handleRemovedFilters({removed: "type"})}>
              <XMarkIcon />
            </i>
          </span>
          <div data-line />
        </div>
      ) : (
        null
      )}
      <div className="selected-genres flex">
        {searchOptions.filters.genres.map(id => (
          <span key={id} className="align-center">
            <b>{ALL_GENRES[id]}</b>
            <i className="icon ::before-abs" onClick={() => handleRemovedFilters({removed: "genre", value: id})}>
              <XMarkIcon />
            </i>
          </span>
        ))}
      </div>
    </div>
  )
}
