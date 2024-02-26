import { useEffect, useState } from "react"
import { Link, useSearchParams, useLocation } from "react-router-dom"

import { searchMovies } from "../utils/apis"
import { useSearch } from "../store/app-context"
import SearchBox from "../components/home/search-box"
import MovieCard from "../components/movie/movie-card"

import "../components/styles/search-results.css"


export default function SearchResults() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useSearch()
  const [params, setParams] = useSearchParams()
  const location = useLocation()

  // useEffect(() => {
  //   const loadResults = async () => {
  //   //+...
  //   setIsLoading(false)
  // }
  //   loadResults()
  // }, [])

  useEffect(() => {
    if (params.get("query")) {
      searchMovies(params.get("query"))
        .then(data => setSearchResults(data.results))
    }
  }, [location])

  return (
    <div className="results-page">
      <header>
        <Link to="/">
          <i className="icon">  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </i>
        </Link>

        <Link to="">
          <i className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </i>
        </Link>
      </header>

      <h3>Search results for: <span>{params.get("query")}</span></h3>

      <SearchBox onHomePage={false} />

      <div className="movies-container">
        <div className="movies-grid">
          {searchResults.map(movie => 
            <Link 
              to={`/movies/${movie.title.trim().toLowerCase().replaceAll(" ", "-")}`} 
              state={{ id: movie.id }} 
              key={movie.id}
            >
              <MovieCard result={movie} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}