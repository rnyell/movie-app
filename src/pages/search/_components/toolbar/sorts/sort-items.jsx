import { motion } from "framer-motion"
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/outline"
import { strCapitalizer } from "@lib/utils"
import { useSearch } from "@src/store"
import { sortResults } from "../../../_utils"

const sorts_item = [
  { item: "none", name: "none" },
  { item: "popularity", name: "popularity" },
  { item: "vote_average", name: "rating" },
  { item: "release_date" , name: "release date" },
  { item: "title" , name: "title" },
]


export default function SortItems({
  setSearchResults,
  searchResults,
  setSortIsOpen
}) {
  const {searchOptions, optionsDispatch} = useSearch()

  function handleSubmitSorts(e) {
    e.stopPropagation()
    e.preventDefault()
    const formData = new FormData(e.target)
    const sortby = formData.get("sortby")
    const order = formData.get("order")
    const unsortedResults = searchResults.results
    const sortedResults = sortResults(unsortedResults, sortby, order)
    setSearchResults({ ...searchResults, results: sortedResults })
    optionsDispatch({ type: "set_sortby", sortby })
    optionsDispatch({ type: "set_order", order })
    setSortIsOpen(false)
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
      <form className="flex-col" onSubmit={handleSubmitSorts}>
        <div className="sort-card sort-options">
          <h6 className="sort-title">Sort by</h6>
          <div className="group flex-col">
            {sorts_item.map(obj => (
              <label key={obj.item} htmlFor={obj.item}>
                {strCapitalizer(obj.name)}
                <input
                  type="radio"
                  name="sortby"
                  id={obj.item}
                  value={obj.item}
                  defaultChecked={searchOptions.sorts.sortby === obj.item}
                  disabled={obj.item === "title" || obj.item === "release_date"}
                  title={(obj.item === "title" || obj.item === "release_date") ? "feature currently is not availabe" : null}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="sort-card sort-order">
          <h6 className="sort-title">Order</h6>
          <div className="group flex-col">
            <label htmlFor="desc" className="align-center">
              <i className="icon"><BarsArrowDownIcon /></i><span>Desc.</span>
              <input
                type="radio"
                name="order"
                id="desc"
                value="desc"
                defaultChecked={searchOptions.sorts.order === "desc"}
              />
            </label>
            <label htmlFor="asc" className="align-center">
              <i className="icon"><BarsArrowUpIcon /></i><span>Asc.</span>
              <input
                type="radio"
                name="order"
                id="asc"
                value="asc"
                defaultChecked={searchOptions.sorts.order === "asc"}
              />
            </label>
          </div>
        </div>
        <button type="submit">Apply</button>
      </form>
    </motion.div>
  )
}
