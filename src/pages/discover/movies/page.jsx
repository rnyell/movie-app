import { Link } from "react-router-dom"
import { displayedMovieGenres } from "@services"
import { useAppContext } from "@src/store"
import { ChevronRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@lib/ui/icons"
import { Snap } from "@lib/ui/components"
import Page from "@components/layouts/page"
import MovieCard from "@components/movie-cards/movie-card"
import GenreList from "../_components/genre-list"

export default function MoviesPage() {
  const { moviesState } = useAppContext()

  return (
    <Page className="movies-page gap-16" viewTransition>
      <section>
        <header className="py-2.5 align-center text-amber-400">
          <h3>Hot Movies</h3>
          <i className="icon fire-icon ml-2 size-5">
            <FireIconSolid />
          </i>
        </header>
        <Snap.Container className="2xs:pt-5">
          {moviesState.popular.map((movie) => (
            <Snap.Item key={movie.id}>
              <MovieCard result={movie} media="movie" variant="common" />
            </Snap.Item>
          ))}
        </Snap.Container>
      </section>
      {displayedMovieGenres.map((genre) => (
        <section key={genre.id}>
          <header className="align-center">
            <h3>{genre.name}</h3>
            <Link
              className="align-center"
              to={`/discover/genres?m=movie&id=${genre.id}&page=1`}
            >
              More
              <i className="icon">
                <ChevronRightIcon />
              </i>
            </Link>
          </header>
          <GenreList media="movie" genreId={genre.id} />
        </section>
      ))}
    </Page>
  )
}
