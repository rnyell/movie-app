import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

import { getRecommendedMovies } from "@src/utils/apis"
import SideNav from "@components/sidenav"
import Header from "@components/header"
import NewsSction from "@components/discover/news-section"
import MovieList from "@components/movie/movie-list"
import MovieCard from "@components/movie/movie-card"

export default function Discover() {
  const [recMovies, setRecMovies] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { pathname } = useLocation()
  const isNestedRoute = pathname === "/discover/movies" || pathname === "/discover/series"

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const data = await getRecommendedMovies(872585)
    setRecMovies(data)
    setIsLoading(false)
  }
  
  return (
    <div className="discover-page">
      {isNestedRoute ? <Outlet /> :
        <>
          <NewsSction />
          <section className="recommended-section">
            <header>
              <h4>Recommended movies</h4>
            </header>
            <div className="movie-list">
              {isLoading ? <h2>loading</h2> : (
                recMovies.map(movie => 
                  <MovieCard key={movie.id} result={movie} type="list" />
                )
              )}
            </div>
          </section>
        </>
      }
    </div>
  )
}
