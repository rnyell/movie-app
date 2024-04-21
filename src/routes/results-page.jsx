import { useEffect, useState } from "react"
import { Link, useSearchParams, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import { useWindow } from "@utils/hooks"
import { getAllResults } from "@utils/apis"
import { devideItemsIntoPages, generatePagination } from "@utils/utils"
import { useSearch } from "@src/store/search-context"

import Header from "@components/header"
import SideFilter from "@components/results/side-filter"
import SmFilter from "@components/results/sm-filter"
import MovieCard from "@components/movie/movie-card"
import Pagination from "@components/pagination"
import { SearchResultsSkeleton } from "@components/skeletons"
import { NotFoundResult } from "@components/errors"

const results_types = ["all", "movie", "tv"]

export default function ResultsPage() {
  const {windowWidth} = useWindow()
  const [searchState, searchDispatch] = useSearch()
  const [searchStateCopy, setSearchStateCopy] = useState({results: [], pages: 0})
  const [filteredType, setFilteredType] = useState("all")
  const [filteredGenres, setFilteredGenres] = useState([])
  const [sortOptions, setSortOptions] = useState({opt: null, order: "Descending"})

  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const query = searchParams.get("query")
  const isInitialMarkup = query === null
  const currentPage = Number(searchParams.get("page")) || 1
  const ITEMS_PER_PAGE = 18
  let allPagesArray = 1
  const isNotFound = searchState.pages === 0

  useEffect(() => {
    loadResultsOnMount()
  }, [])

  useEffect(() => {
    if (query) {
      loadResultsOnUpdate()
    }
  }, [location])

  useEffect(() => {
    filterResultsType()
  }, [filteredType])

  async function loadResultsOnMount() {
    setIsLoading(true)
    let title = query
    const data = await getAllResults(title)
    searchDispatch({
      type: "set_search",
      title,
      results: data.results,
      pages: data.pages,
    })
    setSearchStateCopy({ results: data.results, pages: data.pages })
    setIsLoading(false)
  }

  async function loadResultsOnUpdate() {
    setIsLoading(true)
    let title = query
    console.log(title)
    console.log(searchState.title)
    if (searchState.title !== title) {
      const data = await getAllResults(title)
      searchDispatch({
        type: "set_search",
        title,
        results: data.results,
        pages: data.pages,
      })
      setSearchStateCopy({ results: data.results, pages: data.pages })

      if (data.totalResults === 0) {
        searchDispatch({ type: "set_error" })
        setIsLoading(false)
        throw new Error("not found...")
      }
    }
    setIsLoading(false)
  }

  allPagesArray = generatePagination(currentPage, searchStateCopy.pages)

  function filterResultsType() {
    if (filteredType !== "all") {
      const filtered = searchState.results.filter(
        (res) => res.media_type === filteredType
      )
      const pages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
      setSearchStateCopy({ results: filtered, pages })
      allPagesArray = generatePagination(currentPage, searchStateCopy.pages)
    } else {
      setSearchStateCopy({
        results: searchState.results,
        pages: searchState.pages,
      })
      allPagesArray = generatePagination(currentPage, searchStateCopy.pages)
    }
  }

  function handleFilterGenres() {
    if (filteredGenres.length === 0) {
      return
    }

    const filtered = searchState.results.filter(res => {
      for (let i = 0; i < filteredGenres.length; i++) {
        if (res.genre_ids.includes(filteredGenres[i])) {
          return true
        }
      }
    })
    const pages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
    setSearchStateCopy({ results: filtered, pages })
    allPagesArray = generatePagination(currentPage, searchStateCopy.pages)
  }
  
  // console.log(searchStateCopy.results)

  const results = isNotFound ? (
      <NotFoundResult />
    ) : (
      <motion.div
        className="results-grid"
        layout
        // transition={{ layout: { duration: 0.2 } }}
      >
        {devideItemsIntoPages(currentPage, searchStateCopy.results)
          .map(media => 
            <MovieCard
              key={media.id}
              result={media}
              type={media.media_type}
              variant="result"
            />
          )
        }
      </motion.div>
    )

  return (
    <div className="results-page">
      <Header dataset="sticky expanded" />
      <aside>
        {windowWidth >= 620 ? (
          <SideFilter />
        ) : query !== null ? (
          <>
            <h2 className="heading">
              Results for: <span>{query}</span>
            </h2>
            <SmFilter
              filteredType={filteredType}
              setFilteredType={setFilteredType}
              filteredGenres={filteredGenres}
              setFilteredGenres={setFilteredGenres}
              sortOptions={sortOptions}
              setSortOptions={setSortOptions}
              handleFilterGenres={handleFilterGenres}
            />
          </>
        ) : (
          null
        )}
      </aside>
      <main>
        {isInitialMarkup ? (
          <div>
            <b>todo</b>
            some nice animations initial: search box in appears hear then: after
            clicking on search-icon, it moves to header, or first morphs to a
            spinner ...
          </div>
        ) : (
          <>
            {windowWidth >= 620 && (
            <h2 className="heading">
              Results for: <span>{query}</span>
            </h2>)}
            {windowWidth >= 620 &&
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
            </div>}
            <div className="results-container">
              {isLoading ? <SearchResultsSkeleton /> : results}
            </div>
            {!isNotFound && (
              <Pagination currentPage={currentPage} allPagesArray={allPagesArray} />
            )}
          </>
        )}
      </main>
    </div>
  )
}
