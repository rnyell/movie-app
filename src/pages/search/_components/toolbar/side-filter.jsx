import { useSearch } from "@src/store"
import { filterResults, sortResults, title_styles, submitBtn_styles } from "../../_utils"
import TypeList from "./filters/type-list"
import GenresList from "./filters/genres-list"

export default function SideFilter({ setSearchResults }) {
  const { searchState, searchOptions, optionsDispatch } = useSearch()

  /* add to _utils */
  function sortFilteredResults(initialResults, selectedType, selectedGenres) {
    const { results, pages } = filterResults( initialResults, selectedType, selectedGenres)
    const sortby = searchOptions.sorts.sortby
    const order = searchOptions.sorts.order
    const sortedResults = sortResults(results, sortby, order)
    return { results: sortedResults, pages }
  }

  function handleSubmitFilters(e) {
    e.stopPropagation()
    e.preventDefault()
    const formData = new FormData(e.target)
    const initialResults = searchState.results
    const selectedType = formData.get("type")
    const selectedGenres = formData.getAll("genre")
    const { results, pages } = sortFilteredResults(initialResults, selectedType, selectedGenres)
    setSearchResults({ results, pages })
    optionsDispatch({ type: "set_type", media: selectedType })
    optionsDispatch({ type: "set_genres", ids: selectedGenres })
  }

  return (
    <div className="side-filter">
      <form name="side-filter" className="flex-col" onSubmit={handleSubmitFilters}>
        <div className="form-content flex-col">
          <div className="w-full">
            <h6 className={title_styles}>Type</h6>
            <TypeList />
          </div>
          <div className="w-full relative before:content-[''] before:w-full before:h-9 before:absolute before:z-10 before:bottom-0 before:bg-gradient-to-b before:from-transparent before:to-primary-950">
            <h6 className={title_styles}>Genres</h6>
            <GenresList />
          </div>
          <div
            className="w-full date-filter"
            data-feature-not-available
            title="feature currently is not available"
          >
            <h6 className={title_styles}>Releasee Date</h6>
            <div className="group date-group flex-col">
              <label htmlFor="from" className="align-center">
                <span>from:</span>
                <input type="text" id="from" pattern="[+]?\d+" disabled />
              </label>
              <label htmlFor="to" className="align-center">
                <span>to:</span>
                <input type="text" id="to" pattern="[+]?\d+" disabled />
              </label>
            </div>
          </div>
          <div
            className="w-full lang-filter"
            data-feature-not-available
            title="feature currently is not available"
          >
            <h6 className={title_styles}>Country &amp; language</h6>
            <div className="group lang-group flex-col">
              <label htmlFor="langs" className="align-center">
                <span>Language:</span>
                <div className="::after-abs">
                  <select id="langs" name="langs">
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Dutch">Dutch</option>
                  </select>
                </div>
              </label>
              <label htmlFor="countries" className="align-center">
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
        <button className={`${submitBtn_styles} active:translate-y-[2px]`}>Apply Filters</button>
      </form>
    </div>
  )
}
