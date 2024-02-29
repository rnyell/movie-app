import { useEffect, useState } from "react"
import { Link, useSearchParams, useLocation } from "react-router-dom"

import { searchMovies } from "../utils/apis"
import { useSearch } from "../store/app-context"
import SearchBox from "../components/search-box"
import MovieCard from "../components/movie/movie-card"
import Header from "../components/header"
import { SearchResultsSkeleton } from "../components/skeletons"

import "../components/styles/search-results.css"


export default function SearchResults() {
  const [isLoading, setIsLoading] = useState(true)
  // const [currentPage, setCurrentPage] = useState(1)
  const [searchResults, setSearchResults] = useSearch()
  const [params, setParams] = useSearchParams()
  const location = useLocation()
  // let totalPage = 1

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true)
      searchMovies(params.get("query")).then(data => setSearchResults(data.results))
      // const data = await searchMovies(params.get("query"))
      // setSearchResults(data.results)
      // totalPage = data.totalPages
      setIsLoading(false)
    }

    loadResults()
  }, [])

  useEffect(() => {
    if (params.get("query")) {
      setIsLoading(true)
      const loadResults = async () => {
        searchMovies(params.get("query"))
          .then(data => setSearchResults(data.results))
        setIsLoading(false)
      }
  
      loadResults()
    }
  }, [location])

  function handlePagination(page) {

  }

  return (
    <div className="results-page">
      <Header />
      <SearchBox onHomePage={false} />
      <h2 className="heading">Search results for: <span>{params.get("query")}</span></h2>

      { 
        isLoading ? 
        <SearchResultsSkeleton /> : 
        <div className="movies-container">
          <div className="movies-grid">
            {searchResults.map(movie => 
              <Link 
                to={`/movies/${movie.title.trim().toLowerCase().replaceAll(" ", "-")}`} 
                state={{ id: movie.id }} 
                key={movie.id}
                className="movie-grid-item"
              >
                <MovieCard result={movie} />
              </Link>
            )}
          </div>
        </div>
      }

    </div>
  )
}