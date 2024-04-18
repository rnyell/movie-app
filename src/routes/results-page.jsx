import { useEffect, useState } from "react"
import { Link, useSearchParams, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import { getAllResults } from "@src/utils/apis"
import { devideItemsIntoPages, generatePagination } from "@src/utils/utils"
import { useSearch } from "@src/store/app-context"
import Header from "@components/header"
import MovieCard from "@components/movie/movie-card"
import FilterBox from "@components/filter-box"
import Pagination from "@components/pagination"
import { SearchResultsSkeleton } from "@components/skeletons"
import { NotFoundResult } from "@components/errors"

const results_types = ["all", "movie", "tv"]

export default function ResultsPage() {
  const ITEMS_PER_PAGE = 18
  const [searchState, searchDispatch] = useSearch()
  const [searchStateCopy, setSearchStateCopy] = useState({ results: [], pages: 0 })
  const [resultsType, setResultsType] = useState("all")
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  let currentPage = Number(searchParams.get("page")) || 1
  let allPagesArray = 1

  useEffect(() => {
    loadResultsOnMount()
  }, [])

  useEffect(() => {
    if (searchParams.get("query")) {
      loadResultsOnUpdate()
    }

    if (searchParams.get("query") === null) {

    }
  }, [location])

  useEffect(() => {
    filterResultsType()
  }, [resultsType])

  async function loadResultsOnMount() {
    setIsLoading(true)
    let title = searchParams.get("query")
    const data = await getAllResults(title)
    searchDispatch({
      type: "set_search",
      title,
      results: data.results,
      pages: data.pages,
    })
    setSearchStateCopy({ results: data.results, pages: data.pages})
    setIsLoading(false)
  }

  async function loadResultsOnUpdate() {
    setIsLoading(true)
    let title = searchParams.get("query")
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
      setSearchStateCopy({ results: data.results, pages: data.pages})

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
    if (resultsType !== "all") {
      const filtered = searchState.results.filter(res => 
        res.media_type === resultsType
      )
      const pages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
      setSearchStateCopy({ results: filtered, pages })
      allPagesArray = generatePagination(currentPage, searchStateCopy.pages)
    } else {
      setSearchStateCopy({ results: searchState.results, pages: searchState.pages })
      allPagesArray = generatePagination(currentPage, searchStateCopy.pages)
    }
  }

  const results =
    searchState.pages === 0 ? (
      <NotFoundResult />
    ) : (
      <div className="results-container">
        <motion.div
          className="results-grid"
          layout
          // transition={{ layout: { duration: 0.2 } }}
        >
          {devideItemsIntoPages(currentPage, searchStateCopy.results).map((movie) => (
            <Link
              to={`/movies/${(movie.title || movie.name)
                .trim()
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              state={{
                id: movie.id,
                prevUrl: location.pathname + location.search,
              }}
              key={movie.id}
              className="movie-grid-item"
            >
              <MovieCard result={movie} type="unknown" variant="result" />
            </Link>
          ))}
        </motion.div>
      </div>
    )

  return (
    <div className="results-page">
      <Header dataset="sticky results-page" />
      <aside>
        <FilterBox />
      </aside>
      <main>
        <h2 className="heading">
          Search results for: <span>{searchParams.get("query")}</span>
        </h2>
        <div className="filter-type">
          <div className="type-box">
            {results_types.map(type =>
              <span
                key={type}
                onClick={() => setResultsType(type)}
                className={`${type === resultsType ? "is-active" : null}`}
              >
                {type.substring(0, 1).toUpperCase() + type.substring(1)}
              </span>
            )}
          </div>
        </div>
        {isLoading ? <SearchResultsSkeleton /> : results}
        <Pagination currentPage={currentPage} allPagesArray={allPagesArray} />
        <div className="helper-div">
        </div>
      </main>
    </div>
  )
}
