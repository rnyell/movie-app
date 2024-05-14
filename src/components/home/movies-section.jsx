import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { useMovieState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"


export default function MoviesSection() {
  const [moviesState] = useMovieState()

  return (
    <section className="movies-section">
      <header>
        <h4 className="heading">Now Playing</h4>
        <Link to="/discover/movies">Explore more <ChevronRightIcon /></Link>
      </header>
      <div className="draggable-wrapper">
        <div className="draggable scroll-snap-start">
          {moviesState.movies.slice(0, 12).map(movie =>
            <MovieCard key={movie.id} result={movie} media="movie" variant="screen" />
          )}
        </div>
      </div>
    </section>
  )
}
