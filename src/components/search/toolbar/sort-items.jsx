import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/outline"
import { strCapitalizer } from "@utils/utils"
import { useSearch } from "@src/store/search-context"

const ITEMS_PER_PAGE = 18
const sorts_item = [
  { item: "none", name: "none" },
  { item: "popularity", name: "popularity" },
  { item: "vote_average", name: "rating" },
  { item: "release_date" , name: "release date" },
  { item: "title" , name: "title" },
]


export default function SortItems({ searchStateCopy, setSearchStateCopy, setSortIsOpen }) {
  const {searchOptions, optionsDispatch} = useSearch()

  function updateSelectedSorts(sortby, order) {
    const unsortedResults = searchStateCopy.results
    let sortedResults

    if (sortby === "none") {
      return
    }

    if (sortby === "popularity" || sortby === "vote_average") {
      if (order === "desc") {
        sortedResults = unsortedResults.toSorted(
          (a, b) => b[sortby] - a[sortby]
        )
      } else {
        sortedResults = unsortedResults.toSorted(
          (a, b) => a[sortby] - b[sortby]
        )
      }
    }

    if (sortby === "title") {
      if (order === "desc") {
        sortedResults = unsortedResults.toSorted(
          (a, b) => b[sortby].localeCompare(a[sortby])
        )
      } else {
        sortedResults = unsortedResults.toSorted(
          (a, b) => a[sortby].localeCompare(b[sortby])
        )
      }
    }

    const pages = Math.ceil(sortedResults.length / ITEMS_PER_PAGE)
    setSearchStateCopy({ results: sortedResults, pages })
    // OR: setSearchStateCopy({ ...searchStateCopy,  results: sortedResults })
  }

  function handleSubmitSorts(e) {
    e.stopPropagation()
    e.preventDefault()
    const dataForm = new FormData(e.target)
    const sortby = dataForm.get("sortby")
    const order = dataForm.get("order")
    optionsDispatch({ type: "set_sortby", sortby })
    optionsDispatch({ type: "set_order", order })
    updateSelectedSorts(sortby, order)
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
        <div className="sort-options">
          <h6>Sort by</h6>
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
                />
              </label>
            ))}
          </div>
        </div>
        <hr style={{width: "95%", marginBlock: "1rem", borderWidth: 1.5}} />
        <div className="sort-order">
          <h6>Order</h6>
          <div className="group flex">
            <label htmlFor="desc">
              <i className="icon"><BarsArrowDownIcon /></i><span>Desc.</span>
              <input
                type="radio"
                name="order"
                id="desc"
                value="desc"
                defaultChecked={searchOptions.sorts.order === "desc"}
              />
            </label>
            <label htmlFor="asc">
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
