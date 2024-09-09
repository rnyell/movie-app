import { Link } from "react-router-dom"
import { useAppContext } from "@src/store"
import { ChevronRightIcon } from "@heroicons/outline"
import { Snap } from "@lib/ui/components"
import MovieCard from "@components/movie-cards/movie-card"

export default function FeaturedSection() {
  return (
    <>
      <MoviesSection />
      <SeriesSection />
    </>
  )
}

export function MoviesSection() {
  const { moviesState } = useAppContext()

  return (
    <section className="movies-section">
      <header>
        <h2 className="heading">Trending Movies</h2>
        <Link to="/discover/movies">
          Explore more <ChevronRightIcon />
        </Link>
      </header>
      <Snap.Container>
        {moviesState.movies.slice(0, 12).map((movie, idx) => (
          <Snap.Item key={movie.id}>
            <MovieCard
              result={movie}
              idx={idx}
              media="movie"
              variant="common"
            />
          </Snap.Item>
        ))}
      </Snap.Container>
    </section>
  )
}

export function SeriesSection() {
  const { moviesState } = useAppContext()

  return (
    <section className="series-section">
      <header>
        <h2 className="heading">Trending Series</h2>
        <Link to="/discover/series">
          Explore more <ChevronRightIcon />
        </Link>
      </header>
      <Snap.Container className="min-h-60">
        {moviesState.series.slice(0, 12).map((movie) => (
          <Snap.Item key={movie.id}>
            <MovieCard result={movie} media="tv" variant="series" />
          </Snap.Item>
        ))}
      </Snap.Container>
    </section>
  )
}
