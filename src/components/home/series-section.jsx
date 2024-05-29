import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { useMoviesState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"


export default function SeriesSection() {
  const [moviesState] = useMoviesState()

  return (
    <section className="series-section">
      <header>
        <h3 className="heading">Trending Series</h3>
        <Link to="/discover/series">Explore more <ChevronRightIcon /></Link>
        {/* <p>Be a couch potato for a week!</p> */}
      </header>
      <div className="draggable-wrapper">
        <div className="draggable snap-x-proximity">
          {moviesState.series.slice(0, 12).map(movie =>
            <Link
              key={movie.id}
              to={`/series/${movie.id}`}
              state={{prevUrl: location.pathname + location.search}}
            >
              <MovieCard result={movie} media="tv" variant="series" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}