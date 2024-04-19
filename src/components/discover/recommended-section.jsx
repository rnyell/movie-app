import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getRecommendedMovies } from "@src/utils/apis"
import MovieCard from "@components/movie/movie-card"

export default function RecommendedSection() {
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
    <section className="recommended-section">
      <header>
        <h4>Recommended movies</h4>
      </header>
      <div className="movie-list scroll-snap-start">
        {isLoading ? <h2>loading</h2> : (
          recMovies.map(movie => 
            <MovieCard key={movie.id} result={movie} type="movie" variant="list" />
          )
        )}
      </div>
    </section>
  )
}