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

export default function SearchPage() {
  const {windowWidth} = useWindow()
  const {searchState, searchDispatch, searchOptions, optionsDispatch} = useSearch()
  const [searchStateCopy, setSearchStateCopy] = useState({results: [], pages: 0})
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const query = searchParams.get("query")
  const isInitialMarkup = query === null
  const isNotFound = searchState.pages === 0
  const currentPage = Number(searchParams.get("page")) || 1
  const allPagesArray = generatePagination(currentPage, searchStateCopy.pages)

  // console.log(searchStateCopy)

  useEffect(() => {
    loadResultsOnMount()
  }, [])

  useEffect(() => {
    if (query) {
      loadResultsOnUpdate()
    }
  }, [location])

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
  
  // console.log(searchStateCopy.results)

  const results = isNotFound ? (
      <NotFoundResult />
    ) : (
      <motion.div
        className="search-results"
        layout
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
    <div className="search-page">
      <Header dataset="sticky expanded" />
      <aside>
        {windowWidth >= 620 ? (
          <SideFilter />
        ) : query !== null ? (
          <>
            <h2 className="heading">Results for: <span>{query}</span></h2>
            <SmFilter
              searchStateCopy={searchStateCopy}
              setSearchStateCopy={setSearchStateCopy}
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
            {/* {windowWidth >= 620 &&
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
            </div>} */}
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
