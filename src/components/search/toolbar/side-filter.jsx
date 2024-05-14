import { useEffect, useRef  } from "react"
import { createPortal } from "react-dom"
import { useWindow } from "@utils/hooks"
import { filterResults, sortResults } from "@utils/utils"
import { useSearch } from "@src/store/search-context"
import TypeList from "./filters/type-list"
import GenresList from "./filters/genres-list"
import SortDropdown from "./sorts/sort-dropdown"


export default function SideFilter({ searchStateCopy, setSearchStateCopy }) {
  const {searchState, searchOptions, optionsDispatch} = useSearch()
  const {windowWidth} = useWindow()
  const portalRef = useRef()
  const params = new URLSearchParams(location.search)
  const query = params.get("query")

  useEffect(() => {
    const container = document.querySelector(".sort-dropdown-portal")
    portalRef.current = container
  }, [windowWidth, query])

  function filteredNSortedResults(initialResults, selectedType, selectedGenres) {
    const {results, pages} = filterResults(initialResults, selectedType, selectedGenres)
    const sortby = searchOptions.sorts.sortby
    const order = searchOptions.sorts.order
    const sortedResults = sortResults(results, sortby, order)
    return {results: sortedResults, pages}
  }

  function handleSubmitFilters(e) {
    e.stopPropagation()
    e.preventDefault()
    const formData = new FormData(e.target)
    const initialResults = searchState.results
    const selectedType = formData.get("type")
    const selectedGenres = formData.getAll("genre")
    const {results, pages} = filteredNSortedResults(initialResults, selectedType, selectedGenres)
    setSearchStateCopy({results, pages})
    optionsDispatch({ type: "set_type", media: selectedType })
    optionsDispatch({ type: "set_genres", ids: selectedGenres })
  }


  return (
    <div className="side-filter ::after-abs">
      <form name="side-filter" className="flex-col" onSubmit={handleSubmitFilters}>
        <div className="form-content flex-col">
          
          {windowWidth >= 620 && portalRef.current && (
            createPortal(
              <SortDropdown
                searchStateCopy={searchStateCopy}
                setSearchStateCopy={setSearchStateCopy}
              />,
              portalRef.current
            )
          )}

          <div className="filter-card type-filter">
            <h6 className="filter-title">Type</h6>
            <TypeList />
          </div>
          <div className="filter-card genres-filter ::after-abs">
            <h6 className="filter-title">Genres</h6>
            <GenresList />
          </div>
          <div className="filter-card date-filter"
            data-feature-not-available
            title="feature currently is not available"
          >
            <h6 className="filter-title">Releasee Date</h6>
            <div className="group date-group flex-col">
              <label htmlFor="from" className="flex-align-center">
                <span>from:</span>
                <input type="text" id="from" pattern="[+]?\d+" disabled />
              </label>
              <label htmlFor="to" className="flex-align-center">
                <span>to:</span>
                <input type="text" id="to" pattern="[+]?\d+" disabled />
              </label>
            </div>
          </div>
          <div className="filter-card lang-filter"
            data-feature-not-available
            title="feature currently is not available"
          >
            <h6 className="filter-title">Country &amp; language</h6>
            <div className="group lang-group flex-col">
              <label htmlFor="langs" className="flex-align-center">
                <span>Language:</span>
                <div className="::after-abs">
                  <select id="langs" name="langs">
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Dutch">Dutch</option>
                  </select>
                </div>
              </label>
              <label htmlFor="countries" className="flex-align-center">
                <span>Origin Country:</span>
                <div className="::after-abs">
                  <select id="countries" name="countries">
                    <option value="US">US</option>
                    <option value="England">England</option>
                    <option value="France">France</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
        </div>
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  )
}
