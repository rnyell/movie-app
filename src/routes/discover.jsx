import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import SideNav from "@components/sidenav"
import Header from "@components/header"
import NewsSction from "@components/discover/news-section"
import MovieList from "@components/movie/movie-list"
import { getRecommendedMovies } from "@src/utils/apis"
import MovieCard from "../components/movie/movie-card"

export default function Discover() {
  const [recMovies, setRecMovies] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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
      <SideNav />
      <main>
        <Header dataset="discover default" />
        <NewsSction />
        <section className="recommended-section">
          <header>
            <h4>Recommended movies</h4>
          </header>
          <div className="movie-list">
            {isLoading ? <h2>loading</h2> : (
              recMovies.map(movie => 
                <MovieCard result={movie} type="list" />
              )
            )}
          </div>
        </section>
      </main>
    </div>
    // isLoading ? (
    //   <h2>loading</h2>
    // ) : (
    //   <div className="discover-page">
    //     <SideNav />
    //     <main>
    //       <Header dataset="discover" />
    //       <NewsSction />
    //     </main>
    //   </div>
    // )
  )
}
