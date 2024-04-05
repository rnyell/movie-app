import { useEffect, useState } from "react"
import { Link, useSearchParams, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import { getAllResults } from "@src/utils/apis"
import { generatePagination } from "@src/utils/utils"
import { useSearch } from "@src/store/app-context"
import SearchBox from "@components/search-box"
import MovieCard from "@components/movie/movie-card"
import Header from "@components/header"
import Pagination from "@components/pagination"
import { SearchResultsSkeleton } from "@components/skeletons"
import { NotFoundResult } from "@components/errors"
import FilterBox from "../components/filter-box"

const results_types = ["all", "movie", "tv"]

export default function ResultsPage() {
  const ITEMS_PER_PAGE = 18
  const [isLoading, setIsLoading] = useState(true)
  const [searchState, searchDispatch] = useSearch()
  const [searchStateCopy, setSearchStateCopy] = useState({
    results: [],
    pages: 0
  })
  const [resultsType, setResultsType] = useState("all")
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  // how does it work? this is a simple variable not a state...
  let currentPage = Number(searchParams.get("page")) || 1
  let allPagesArray = 1

  useEffect(() => {
    loadResultsOnMount()
  }, [])

  useEffect(() => {
    if (searchParams.get("query")) {
      loadResultsOnUpdate()
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

  function devideResultsIntoPages(page) {
    let arg1 = (page - 1) * ITEMS_PER_PAGE
    let arg2 = ITEMS_PER_PAGE * page
    return searchStateCopy.results.slice(arg1, arg2)
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
          {devideResultsIntoPages(currentPage).map((movie) => (
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
              <MovieCard result={movie} type="result" />
            </Link>
          ))}
        </motion.div>
      </div>
    )

  return (
    <div className="results-page">
      <div className="sticky">
        <Header dataLocation="results-page">
          <SearchBox dataLocation="results-page" />
        </Header>
      </div>
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
