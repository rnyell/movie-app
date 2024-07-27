import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { useMoviesState } from "@src/store"
import MovieCard from "@components/movie-cards/movie-card"


export default function MoviesSection() {
  const [moviesState] = useMoviesState()

  return (
    <section className="movies-section">
      <header>
        <h2 className="heading">Currently In Theatres</h2>
        <Link to="/onscreen">Explore more <ChevronRightIcon /></Link>
      </header>
      <div className="draggable-wrapper">
        <div className="draggable snap-x-proximity">
          {moviesState.movies.slice(0, 12).map((movie, idx) =>
            <MovieCard key={movie.id} result={movie} idx={idx} media="movie" variant="screen" />
          )}
        </div>
      </div>
    </section>
  )
}
