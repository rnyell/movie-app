import { useEffect, useState } from "react"
import { getMoviesByGenre } from "../../utils/apis"
import MovieCard from "./movie-card"


export default function MovieList({ genreId }) {
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const data = await getMoviesByGenre(genreId)
    setMovies(data)
    setIsLoading(false)
  }

  return (
    isLoading ? (
      <p>loading</p>
    ) : (
      <div className="movie-list">
        {movies.map(movie => <MovieCard key={movie.id} result={movie} type="list" />)}
      </div>
    )
  )
}
