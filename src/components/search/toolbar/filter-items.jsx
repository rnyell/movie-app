import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FILTER_GENRES, MEDIA_TYPES } from "@utils/apis"
import { useSearch } from "@src/store/search-context"
import GenreCheckbox from "./genre-checkbox"
import TypeCheckbox from "./type-checkbox"

const ITEMS_PER_PAGE = 18


export default function FilterItems({ setSearchStateCopy, setFilterIsOpen }) {
  const {searchState, optionsDispatch} = useSearch()
  // const [genres, setGenres] = useState(searchOptions.filters.genres) // hacky... state was one step behind. forced us to use useEffect
  // useEffect(() => {
  //   // hacky...
  //   updateSelectedFilters()
  // }, [genres])
  
  function returnFilteredByGenres(selectedGenres) {
    const initialResults = searchState.results
    if (selectedGenres.length === 0) {
      return initialResults
    }

    const filteredResults = initialResults.filter(res => {
      for (let i = 0; i < selectedGenres.length; i++) {
        if (res.genre_ids.includes(+selectedGenres[i])) {
          return true
        }
      }
    })

    return filteredResults
  }

  function updateSelectedFilters(selectedType, selectedGenres) {
    const filteredByGenres = returnFilteredByGenres(selectedGenres)
    if (selectedType !== "all") {
      const filtered = filteredByGenres.filter(item => item.media_type === selectedType)
      const pages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
      setSearchStateCopy({ results: filtered, pages })
    } else {
      const pages = Math.ceil(filteredByGenres.length / ITEMS_PER_PAGE)
      setSearchStateCopy({ results: filteredByGenres, pages })
    }
  }

  function handleSubmitFilters(e) {
    e.stopPropagation()
    e.preventDefault()
    const formData = new FormData(e.target)
    const selectedType = formData.get("type")
    const selectedGenres = formData.getAll("genre")
    optionsDispatch({ type: "set_type", media: selectedType })
    optionsDispatch({ type: "set_genres", ids: selectedGenres })
    updateSelectedFilters(selectedType, selectedGenres)
    // setGenres(selectedGenres)
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
        <div className="type-filter">
          <h6>Type</h6>
          <div className="group type-box">
            {MEDIA_TYPES.map(type => (
              <TypeCheckbox key={type} type={type} />
            ))}
          </div>
        </div>
        <hr style={{width: "95%", marginBlock: "1rem", borderWidth: 1.5}} />
        <div className="genre-filter">
          <h6>Genres</h6>
          <div className="group flex-wrap">
            {FILTER_GENRES.map(genre => (
              <GenreCheckbox key={genre.id} genre={genre} />
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
        <button type="submit">Apply</button>
      </form>
    </motion.div>
  )
}
