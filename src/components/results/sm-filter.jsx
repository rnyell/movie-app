import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import { EqualizerIcon } from "@src/utils/icons"
import { FunnelIcon } from "@heroicons/outline"
import { filterGenres } from "@src/utils/apis"
import { useClickOutside } from "@src/utils/hooks"

const results_types = ["all", "movie", "tv"]

export default function SmFilter({
  filteredType,
  setFilteredType,
  filteredGenres,
  setFilteredGenres,
  handleFilterGenres,
}) {
  const filterRef = useRef(null)
  const sortRef = useRef(null)
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const [sortIsOpen, setSortIsOpen] = useState(false)

  useClickOutside(filterRef, handleClickOutside)

  function handleClickOutside() {
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

  function handleApplyFilters() {
    handleFilterGenres()
    setFilterIsOpen(false)
  }

  console.log(filteredGenres)

  return (
    <>
      <div className="sm-filter">
        <div className="type-filter">
          <div className="type-box">
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
        <div
          className={`filter-dropdown ${filterIsOpen && "is-open"}`}
          ref={filterRef}
          onClick={() => setFilterIsOpen(true)}
        >
          <p>Filters</p>
          <i className="icon"><FunnelIcon /></i>
          <AnimatePresence>
            {filterIsOpen && (
              <div className="dropdown-box">
                <div className="genre-items">
                  <h6>Genres</h6>
                  <div className="flex-wrap">
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
                  <hr style={{width: "95%", marginBlock: "1rem", borderWidth: 1.5}} />
                  <h6>Language & Country</h6>
                  <div className="">

                  </div>
                </div>
                <button onClick={handleApplyFilters}>Apply</button>
              </div>
            )}
          </AnimatePresence>
        </div>
        <div
          className={`sort-dropdown ${filterIsOpen && "is-open"}`}
          ref={sortRef}
          onClick={() => setSortIsOpen(true)}
        >
          <p>Sort</p>
          <i className="icon"><EqualizerIcon /></i>
          <AnimatePresence>
            {sortIsOpen && (
              <div className="dropdownbox">
                <ul>
                  <li>Popularity</li>
                  <li>Release Date</li>
                  <li>...</li>
                </ul>
                <hr style={{width: "95%", marginBlock: "1rem", borderWidth: 1.5}} />
                <div>
                  <p>Ascending</p>
                  <p>Descending</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="selected-filters">

      </div>
    </>
  )
}
