import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FunnelIcon, BarsArrowDownIcon, BarsArrowUpIcon, XMarkIcon } from "@heroicons/outline"
import { EqualizerIcon } from "@src/utils/icons"
import { useClickOutside } from "@utils/hooks"
import { FILTER_GENRES, ALL_GENRES } from "@utils/apis"
import { useSearch } from "@src/store/search-context"

const results_types = ["all", "movie", "tv"]
const ITEMS_PER_PAGE = 18

export default function SmFilter({ searchStateCopy, setSearchStateCopy }) {
  const {searchState, searchOptions, optionsDispatch} = useSearch()
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [sortIsOpen, setSortIsOpen] = useState(false)
  const [s, setS] = useState(0) // !hacky - to update state syncly...
  const ref = useRef(null)

  // console.log(searchOptions)

  useEffect(() => {
    updateSelectedFilters()
  }, [s])

  useClickOutside(ref, handleClickOutside)

  function handleClickOutside() {
    if (filterIsOpen) setFilterIsOpen(false)
    if (sortIsOpen) setSortIsOpen(false)
  }

  function showFilterItems() {
    setFilterIsOpen(true)
    setSortIsOpen(false)
  }

  function showSortItems() {
    setSortIsOpen(true)
    setFilterIsOpen(false)
  }

  // function returnFilteredByType() {
  //   const initialResults = searchState.results
  //   const selectedType = searchOptions.filters.type

  //   if (selectedType !== "all") {
  //     const filtered = searchState.results.filter(item => item.media_type === selectedType)
  //     return filtered
  //   }

  //   return initialResults
  // }

  function returnFilteredByGenres() {
    const initialResults = searchState.results
    const selectedGenres = searchOptions.filters.genres
    if (selectedGenres.length === 0) {
      return initialResults
    }

    const filteredResults = initialResults.filter(res => {
      for (let i = 0; i < selectedGenres.length; i++) {
        if (res.genre_ids.includes(selectedGenres[i])) {
          return true
        }
      }
    })

    console.log(filteredResults)
    return filteredResults
  }

  function updateSelectedFilters() {
    const selectedType = searchOptions.filters.type
    const filteredByGenres = returnFilteredByGenres()
    if (selectedType !== "all") {
      const filtered = filteredByGenres.filter(item => item.media_type === selectedType)
      const pages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
      setSearchStateCopy({ results: filtered, pages })
    } else {
      const pages = Math.ceil(filteredByGenres.length / ITEMS_PER_PAGE)
      setSearchStateCopy({ results: filteredByGenres, pages })
    }
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

  console.log(searchOptions.filters)

  function handleApplyClick(e) {
    e.stopPropagation()
    updateSelectedFilters()
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
    <>
      <div className="sm-filter">
        <div className="wrapper" ref={ref}>
          <div
            className={`filter-dropdown ${filterIsOpen && "is-open"}`}
            onClick={showFilterItems}
          >
            <p>Filters</p>
            <i className="icon"><FunnelIcon /></i>
            <AnimatePresence>
              {filterIsOpen && (
                <motion.div
                  className="dropdown-box flex-col"
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="type-filter">
                    <h6>Type</h6>
                    <div className="group type-box">
                      {results_types.map((type) => (
                        <span
                          key={type}
                          onClick={() => optionsDispatch({type: "set_type", media: type})}
                          className={`${type === searchOptions.filters.type ? "is-active" : null}`}
                        >
                          {type === "tv" ? "TV" : type.substring(0, 1).toUpperCase() + type.substring(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <hr style={{width: "95%", marginBlock: "1rem", borderWidth: 1.5}} />
                  <div className="genre-filter">
                    <h6>Genres</h6>
                    <div className="group flex-wrap">
                      {FILTER_GENRES.map(obj => (
                        <span
                          key={obj.id}
                          className={`${searchOptions.filters.genres.includes(obj.id) && "is-active"}`}
                          onClick={() => optionsDispatch({type: "set_genres", id: obj.id})}
                        >
                          {obj.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <hr style={{width: "95%", marginBlock: "1rem", borderWidth: 1.5}} />
                  <div
                    data-feature-not-available
                    title="feature currently is not available"
                    className="lang-filter"
                  >
                    <h6>Language & Country</h6>
                    <div className="group flex-col">
                      <label htmlFor="langs" className="flex-y-center">
                        <span>Language:</span>
                        <div className="::after-abs">
                          <select id="langs" name="langs">
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="Dutch">Dutch</option>
                          </select>
                        </div>
                      </label>
                      <label htmlFor="countries" className="flex-y-center">
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
                  <button onClick={handleApplyClick}>Apply</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className={`sort-dropdown ${sortIsOpen && "is-open"}`}
            onClick={showSortItems}
          >
            <p>Sort</p>
            <i className="icon"><EqualizerIcon /></i>
            <AnimatePresence>
              {sortIsOpen && (
                <motion.div
                  className="dropdown-box flex-col"
                  variants={dropdownVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="sort-options">
                    <h6>Sort by</h6>
                    <div className="group flex-col">
                      <label>
                        Popularity <input type="radio" name="opt" />
                      </label>
                      <label>
                        Release Date <input type="radio" name="opt" />
                      </label>
                      <label>
                        Name <input type="radio" name="opt" />
                      </label>
                    </div>
                  </div>
                  <hr style={{width: "95%", marginBlock: "1rem", borderWidth: 1.5}} />
                  <div className="sort-order">
                    <h6>Order</h6>
                    <div className="group flex">
                      <label className="flex-y-center">
                        <i className="icon"><BarsArrowUpIcon /></i><span>Asc.</span>
                        <input type="radio" name="order" />
                      </label>
                      <label className="flex-y-center">
                        <i className="icon"><BarsArrowDownIcon /></i><span>Desc.</span>
                        <input type="radio" name="order" />
                      </label>
                    </div>
                  </div>
                  <button>Apply</button>
                </motion.div>
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
