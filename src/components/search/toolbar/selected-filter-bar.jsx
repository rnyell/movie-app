import { XMarkIcon } from "@heroicons/outline"
import { ALL_GENRES } from "@utils/apis"
import { useSearch } from "@src/store/search-context"
import { filterResults, sortResults } from "@utils/utils"


export default function SelectedFiltersBar({ setSearchStateCopy }) {
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
      setSearchStateCopy({results: sortedResults, pages})
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
      setSearchStateCopy({results: sortedResults, pages})
    }
  }


  return (
    <div className="selected-filters flex">
      {searchOptions.filters.type !== "all" ? (
        <div className="selected-type flex">
          <span className="flex-align-center">
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
          <span key={id} className="flex-align-center">
            <b>{ALL_GENRES[id]}</b>
            <i className="icon ::before-abs" onClick={() => handleRemovedFilters({removed:"genre", value: id})}>
              <XMarkIcon />
            </i>
          </span>
        ))}
      </div>
    </div>
  )
}
