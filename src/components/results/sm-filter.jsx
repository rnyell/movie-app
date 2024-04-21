import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FunnelIcon, BarsArrowDownIcon, BarsArrowUpIcon, XMarkIcon } from "@heroicons/outline"
import { EqualizerIcon } from "@src/utils/icons"
import { useClickOutside } from "@utils/hooks"
import { filterGenres, ALL_GENRES } from "@utils/apis"

const results_types = ["all", "movie", "tv"]

export default function SmFilter({
  filteredType,
  setFilteredType,
  filteredGenres,
  setFilteredGenres,
  sortOptions,
  setSortOptions,
  handleFilterGenres,
}) {
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [sortIsOpen, setSortIsOpen] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, handleClickOutside)
  function handleClickOutside() {
    if (filterIsOpen) {
      setFilterIsOpen(false)
    }

    if (sortIsOpen) {
      setSortIsOpen(false)
    }
  }

  function showFilterItems() {
    setFilterIsOpen(true)
    setSortIsOpen(false)
  }

  function showSortItems() {
    setSortIsOpen(true)
    setFilterIsOpen(false)
  }

  function toggleGenre(id) {
    let filtered
    if (filteredGenres.includes(id)) {
      filtered = filteredGenres.filter(el => el !== id)
    } else {
      filtered = [...new Set( [...filteredGenres, id] )]
    }
    setFilteredGenres(filtered)
  }

  function removeGenre(id) {
    const filtered = filteredGenres.filter(fg => fg !== id)
    setFilteredGenres([...filtered])
    handleFilterGenres()
  }

  function handleApplyFilters() {
    handleFilterGenres()
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

  console.log(filteredGenres)

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
                          onClick={() => setFilteredType(type)}
                          className={`${type === filteredType ? "is-active" : null}`}
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
                      {filterGenres.map(obj => (
                        <span
                          key={obj.id}
                          className={`${filteredGenres.includes(obj.id) && "is-active"}`}
                          onClick={() => toggleGenre(obj.id)}
                        >
                          {obj.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <hr style={{width: "95%", marginBlock: "1rem", borderWidth: 1.5}} />
                  <div className="lang-filter">
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
                  <button onClick={handleApplyFilters}>Apply</button>
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
        <div className="slc-genres flex">
          {!filterIsOpen && filteredGenres.map(id => (
            <span key={id} className="slc-genre flex-y-center">
              {ALL_GENRES[id]}
              <i className="icon" onClick={() => removeGenre(id)}>
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
