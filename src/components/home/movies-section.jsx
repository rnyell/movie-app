import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { useMoviesState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"


export default function MoviesSection() {
  const [moviesState] = useMoviesState()

  return (
    <section className="movies-section">
      <header>
        <h3 className="heading">Currently In Theatres</h3>
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
