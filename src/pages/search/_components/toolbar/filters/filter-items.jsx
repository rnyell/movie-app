import { useSearch } from "@src/store"
import { Dropdown } from "@lib/ui/components"
import { Divider } from "@lib/ui/components"
import { filterResults, sortResults, submitBtn_styles, title_styles } from "../../../_utils"
import TypeList from "./type-list"
import GenresList from "./genres-list"

export default function FilterItems({ setSearchResults }) {
  const { searchState, searchOptions, optionsDispatch } = useSearch()
  const initialResults = searchState.results
  const { closeMenu } = Dropdown.useDropdownContext()

  function sortFilteredResults(initialResults, selectedType, selectedGenres) {
    const { results, pages } = filterResults(initialResults, selectedType, selectedGenres)
    const sortby = searchOptions.sorts.sortby
    const order = searchOptions.sorts.order
    const sortedResults = sortResults(results, sortby, order)
    return { results: sortedResults, pages }
  }

  function handleSubmitFilters(e) {
    e.stopPropagation()
    e.preventDefault()
    const formData = new FormData(e.target)
    const selectedType = formData.get("type")
    const selectedGenres = formData.getAll("genre")
    const { results, pages } = sortFilteredResults(initialResults, selectedType, selectedGenres)
    setSearchResults({ results, pages })
    optionsDispatch({ type: "set_type", media: selectedType })
    optionsDispatch({ type: "set_genres", ids: selectedGenres })
    closeMenu()
  }

  return (
    <form onSubmit={handleSubmitFilters} className="flex-col xs:gap-4">
      <div className="w-full">
        <h6 className={title_styles}>Type</h6>
        <TypeList />
      </div>
      <Divider variant="bold" width="almost-fill" thickness="thin" />
      <div className="relative before:content-[''] before:w-full before:h-9 before:absolute before:z-10 before:bottom-0 before:bg-gradient-to-b before:from-transparent before:to-primary-900">
        <h6 className={title_styles}>Genres</h6>
        <GenresList />
      </div>
      <Divider variant="bold" width="almost-fill" thickness="thin" />
      <div
        data-feature-not-available
        title="feature currently is not available"
        className="w-full lang-filter"
      >
        <h6 className={title_styles}>Language & Country</h6>
        <div className="group flex-col">
          <label htmlFor="langs" className="align-center">
            <span>Language:</span>
            <div className="::after-abs">
              <select id="langs" name="langs" disabled={true}>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Dutch">Dutch</option>
              </select>
            </div>
          </label>
          <label htmlFor="countries" className="align-center">
            <span>Origin Country:</span>
            <div className="::after-abs">
              <select id="countries" name="countries" disabled={true}>
                <option value="US">US</option>
                <option value="England">England</option>
                <option value="France">France</option>
              </select>
            </div>
          </label>
        </div>
      </div>
      <button className={submitBtn_styles}>Apply</button>
    </form>
  )
}
