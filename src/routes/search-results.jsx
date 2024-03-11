import { useEffect, useState } from "react"
import { Link, useSearchParams, useLocation } from "react-router-dom"

import { getSearchedMovies } from "@src/utils/apis"
import { generatePagination } from "@src/utils/utils"
import { useSearch } from "@src/store/app-context"
import SearchBox from "@components/search-box"
import MovieCard from "@components/movie/movie-card"
import Header from "@components/header"
import { SearchResultsSkeleton } from "@components/skeletons"
import Pagination from "@components/pagination"

import "@styles/search-results.css"


export default function SearchResults() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchState, searchDispatch] = useSearch()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  let currentPage = Number(searchParams.get("page")) || 1

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true)
      const data = await getSearchedMovies(searchParams.get("query"))
      searchDispatch({
        type: "set_search",
        results: data.results,
        totalPages: data.totalPages
      })
      setIsLoading(false)
    }

    loadResults()
  }, [])

  useEffect(() => {
    if (searchParams.get("query")) {
      setIsLoading(true)
      const loadResults = async () => {
        const data = await getSearchedMovies(searchParams.get("query"), searchParams.get("page"))
        
        if (data.totalResults === 0) {
          searchDispatch({ type: "set_error" })
          setIsLoading(false)
          throw new Error("not found...")
        }

        searchDispatch({
          type: "set_search",
          results: data.results,
          totalPages: data.totalPages
        })
        setIsLoading(false)
      }
  
      loadResults()
    }
  }, [location])

  const allPagesArray = generatePagination(currentPage, searchState.totalPages)


  const result = searchState.totalPages === 0 ? 
    <div className="not-found-result">
      <aside>
        <h3>No results found...</h3>
        <p>Try another one</p>
        <Link>See trend movies</Link>
      </aside>
      <img className="gif" src="../../public/gifs/jt.gif" />
    </div> : 
    <div className="movies-grid">
      {searchState.results.map(movie => 
        <Link 
          to={`/movies/${movie.title.trim().toLowerCase().replaceAll(" ", "-")}`} 
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
        <div className="movies-container">{result}</div>
      }
      <Pagination currentPage={currentPage} allPagesArray={allPagesArray} />
    </div>
  )
}