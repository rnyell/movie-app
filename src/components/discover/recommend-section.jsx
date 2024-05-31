import { useEffect, useState } from "react"
import { getRecommendedMovies, getRecommendedSeries } from "@services"
import MovieCard from "@components/movie/movie-card"


export default function RecommendSection() {
  const [recMovies, setRecMovies] = useState(null)
  const [recSeries, setRecSeries] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const movies = await getRecommendedMovies(872585)
    const series = await getRecommendedSeries(1396)
    setRecMovies(movies)
    setRecSeries(series)
    setIsLoading(false)
  }


  return (
    <>
      <section className="recommend-section">
        <header>
          <h4 className="heading">Recommended movies</h4>
        </header>
        <div className="movie-list snap-x-proximity">
          {isLoading ? <h2>loading</h2> : (
            recMovies.map(movie => 
              <MovieCard key={movie.id} result={movie} media="movie" variant="common" />
            )
          )}
        </div>
      </section>
      <section className="recommend-section">
        <header>
          <h4 className="heading">Recommended movies</h4>
        </header>
        <div className="movie-list snap-x-proximity">
          {isLoading ? <h2>loading</h2> : (
            recSeries.map(movie => 
              <MovieCard key={movie.id} result={movie} media="tv" variant="common" />
            )
          )}
        </div>
      </section>
    </>
  )
}
