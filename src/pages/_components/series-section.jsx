import { Link } from "react-router-dom"
import { useAppContext } from "@src/store"
import { ChevronRightIcon } from "@heroicons/outline"
import { Snap } from "@lib/ui/components"
import MovieCard from "@components/movie-cards/movie-card"


export default function SeriesSection() {
  const { moviesState } = useAppContext()

  return (
    <section className="series-section">
      <header>
        <h2 className="heading">Trending Series</h2>
        <Link to="/discover/series">Explore more <ChevronRightIcon /></Link>
        {/* <p>Be a couch potato for a week!</p> */}
      </header>
      <Snap.Container customStyles="py-4">
        {moviesState.series.slice(0, 12).map(movie => (
          <Snap.Item key={movie.id}>
            <MovieCard
              result={movie}
              media="tv"
              variant="series"
            />
          </Snap.Item>
        ))}
      </Snap.Container>
    </section>
  )
}
