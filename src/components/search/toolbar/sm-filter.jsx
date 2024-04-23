import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FunnelIcon, XMarkIcon } from "@heroicons/outline"
import { EqualizerIcon } from "@src/utils/icons"
import { useClickOutside } from "@utils/hooks"
import { FILTER_GENRES, ALL_GENRES } from "@utils/apis"
import { useSearch } from "@src/store/search-context"

import FilterItems from "./filter-items"
import SortItems from "./sort-items"


export default function SmFilter({ searchStateCopy, setSearchStateCopy }) {
  const {searchState, searchOptions, optionsDispatch} = useSearch()
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [sortIsOpen, setSortIsOpen] = useState(false)
  const ref = useRef(null)
  const [s, setS] = useState(0) // !hacky - to update state syncly on remove...

  useEffect(() => {
    // updateSelectedFilters()
  }, [s])

  useClickOutside(ref, handleClickOutside)

  function handleClickOutside() {
    if (filterIsOpen) setFilterIsOpen(false)
    if (sortIsOpen) setSortIsOpen(false)
  }

  function showFilterDropdown() {
    setFilterIsOpen(true)
    setSortIsOpen(false)
  }

  function showSortDropdown() {
    setSortIsOpen(true)
    setFilterIsOpen(false)
  }

  function handleRemovedFilters(id) {
    if (typeof id === "string" && searchOptions.filters.type !== "all") {
      optionsDispatch({ type: "set_type", media: "all" })
    }

    if (typeof id === "number") {
      optionsDispatch({ type: "set_genres", id })
    }

    setS(s + 1)
  }


  return (
    <>
      <div className="sm-filter">
        <div className="wrapper" ref={ref}>
          <div
            className={`filter-dropdown ${filterIsOpen && "is-open"}`}
            onClick={showFilterDropdown}
          >
            <p>Filters</p>
            <i className="icon"><FunnelIcon /></i>
            <AnimatePresence>
              {filterIsOpen && (
                <FilterItems 
                  setSearchStateCopy={setSearchStateCopy}
                  setFilterIsOpen={setFilterIsOpen}
                />
              )}
            </AnimatePresence>
          </div>
          <div
            className={`sort-dropdown ${sortIsOpen && "is-open"}`}
            onClick={showSortDropdown}
          >
            <p>Sort</p>
            <i className="icon"><EqualizerIcon /></i>
            <AnimatePresence>
              {sortIsOpen && (
                <SortItems
                  searchStateCopy={searchStateCopy}
                  setSearchStateCopy={setSearchStateCopy}
                  setSortIsOpen={setSortIsOpen}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="selected-filters flex">
        {searchOptions.filters.type !== "all" ? (
          <div className="slc-type flex">
            <span className="flex-y-center">
              {searchOptions.filters.type}
              <i className="icon ::before-abs" onClick={() => handleRemovedFilters("t")}>
                <XMarkIcon />
              </i>
            </span>
            <div data-line />
          </div>
        ) : (
          null
        )}
        <div className="slc-genres flex">
          {searchOptions.filters.genres.map(id => (
            <span key={id} className="slc-genre flex-y-center">
              {ALL_GENRES[id]}
              <i className="icon ::before-abs" onClick={() => handleRemovedFilters(id)}>
                <XMarkIcon />
              </i>
            </span>
          ))}
        </div>
      </div>
      <hr style={{marginBlock: "1rem"}} />
    </>
  )
}
