import { useEffect, useState } from "react"
import { Link, useSearchParams, useLocation } from "react-router-dom"

import { getAllResults } from "@src/utils/apis"
import { generatePagination } from "@src/utils/utils"
import { useSearch } from "@src/store/app-context"
import SearchBox from "@components/search-box"
import MovieCard from "@components/movie/movie-card"
import Header from "@components/header"
import { SearchResultsSkeleton, NotFoundResult } from "@components/skeletons"
import Pagination from "@components/pagination"

import "@styles/search-results.css"


export default function SearchResults() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchState, searchDispatch] = useSearch()
  const [searchStateCopy, setSearchStateCopy] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  // how does it work? this is a simple variable not a state...
  let currentPage = Number(searchParams.get("page")) || 1

  useEffect(() => {
    loadResultsOnMount()
  }, [])

  useEffect(() => {
    if (searchParams.get("query")) {
      loadResultsOnUpdate()
    }
  }, [location])

  async function loadResultsOnMount() {
    setIsLoading(true)
    let title = searchParams.get("query")
    const data = await getAllResults(title)
    searchDispatch({
      type: "set_search",
      title: title,  /* JFYI: i know the conscies property naming syntax, but this is more expressive */
      results: data.results,
      pages: data.pages
    })
    setSearchStateCopy(data.results)
    setIsLoading(false)
  }

  async function loadResultsOnUpdate() {
    setIsLoading(true)
    let title = searchParams.get("query")
    if (searchState.title !== title) {
      const data = await getAllResults(title)
      searchDispatch({
        type: "set_search",
        title: title,
        results: data.results,
        pages: data.pages
      })
      setSearchStateCopy(data.results)

      if (data.totalResults === 0) {
        searchDispatch({ type: "set_error" })
        setIsLoading(false)
        throw new Error("not found...")
      }
    }
    setIsLoading(false)
  }

  function devideResultsIntoPages(page) {
    let arg1 = 0 + ((page - 1) * 15)
    let arg2 = 15 * page
    return searchState.results.slice(arg1, arg2)
  }

  const allPagesArray = generatePagination(currentPage, searchState.pages)

  const results = searchState.pages === 0 ? 
    <NotFoundResult /> : 
    <div className="movies-container">
      <div className="movies-grid">
        {devideResultsIntoPages(currentPage).map(movie => 
          <Link 
            to={`/movies/${(movie.title || movie.name).trim().toLowerCase().replaceAll(" ", "-")}`} 
            state={{
              id: movie.id, 
              prevUrl: (location.pathname + location.search)
            }} 
            key={movie.id}
            className="movie-grid-item"
          >
            <MovieCard result={movie} />
          </Link>
        )}
      </div>
    </div>;

  return (
    <div className="results-page">
      <Header />
      <SearchBox onHomePage={false} />
      <h2 className="heading">
        Search results for: <span>{searchParams.get("query")}</span>
      </h2>
      {
        isLoading ? 
        <SearchResultsSkeleton /> : 
        results
      }
      <Pagination currentPage={currentPage} allPagesArray={allPagesArray} />
    </div>
  )
}