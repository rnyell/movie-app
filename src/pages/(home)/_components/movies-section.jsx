import { Link } from "react-router-dom"
import { useAppContext } from "@src/store"
import { Snap } from "@lib/ui/components"
import { ChevronRightIcon } from "@heroicons/outline"
import MovieCard from "@components/movie-cards/movie-card"


export default function MoviesSection() {
  const { moviesState } = useAppContext()

  return (
    <section className="movies-section">
      <header>
        <h2 className="heading">Currently In Theatres</h2>
        <Link to="/onscreen">Explore more <ChevronRightIcon /></Link>
      </header>
      <Snap.Container customStyles="py-4">
        {moviesState.screen.slice(0, 12).map((movie, idx) => (
          <Snap.Item key={movie.id}>
            <MovieCard
              result={movie}
              idx={idx}
              media="movie"
              variant="screen"
            />
          </Snap.Item>
        ))}
      </Snap.Container>
    </section>
  )
}
