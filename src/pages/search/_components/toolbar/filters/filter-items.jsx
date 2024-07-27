import { motion } from "framer-motion"
import { useSearch } from "@src/store"
import { Divider } from "@src/lib/ui/components"
import { filterResults, sortResults } from "../../../_utils"
import TypeList from "./type-list"
import GenresList from "./genres-list"


export default function FilterItems({ setSearchStateCopy, setFilterIsOpen }) {
  const {searchState, searchOptions, optionsDispatch} = useSearch()
  const initialResults = searchState.results

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
    const selectedType = formData.get("type")
    const selectedGenres = formData.getAll("genre")
    const {results, pages} = filteredNSortedResults(initialResults, selectedType, selectedGenres)
    setSearchStateCopy({results, pages})
    optionsDispatch({ type: "set_type", media: selectedType })
    optionsDispatch({ type: "set_genres", ids: selectedGenres })
    setFilterIsOpen(false)
  }

  const dropdownVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: 10
    }
  }


  return (
    <motion.div
      className="dropdown-box"
      variants={dropdownVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <form onSubmit={handleSubmitFilters} className="flex-col">
        <div className="filter-card type-filter">
          <h6 className="filter-title">Type</h6>
          <TypeList />
        </div>
        <Divider variant="bold" width="almost-fill" thickness="thin" />
        <div className="filter-card genres-filter ::after-abs">
          <h6 className="filter-title">Genres</h6>
          <GenresList />
        </div>
        <Divider variant="bold" width="almost-fill" thickness="thin" />
        <div
          data-feature-not-available
          title="feature currently is not available"
          className="filter-card lang-filter"
        >
          <h6 className="filter-title">Language & Country</h6>
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
        <button type="submit">Apply</button>
      </form>
    </motion.div>
  )
}
