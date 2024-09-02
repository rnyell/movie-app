import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@lib/ui/icons"
import { displayedMovieGenres } from "@services"
import { useAppContext } from "@src/store"
import { ViewTransition } from "@lib/motion"
import { Snap } from "@lib/ui/components"
import Page from "@components/layouts/page"
import GenreList from "@components/genre-list"
import MovieCard from "@components/movie-cards/movie-card"


export default function MoviesPage() {
  const { moviesState } = useAppContext()


  return (
    <ViewTransition>
      <Page className="movies-page">
        <section className="hot-movies-section">
          <header className="flex">
            <h3 className="heading">Hot Movies</h3>
            <i className="icon fire-icon">
              <FireIconSolid />
            </i>
          </header>
          <div className="h-90%">
            <Snap.Container>
              {moviesState.popular.map(movie => (
                <Snap.Item key={movie.id}>
                  <MovieCard
                    result={movie}
                    media="movie"
                    variant="common"
                  />
                </Snap.Item>
              ))}
            </Snap.Container>
          </div>
        </section>
        {displayedMovieGenres.map(genreObj => 
          <section key={genreObj.id}>
            <header className="flex">
              <h3 className="heading">{genreObj.name}</h3>
              <Link to={`/discover/movies/${genreObj.id}`} className="align-center">
                More
                <i className="icon">
                  <ChevronRightIcon />
                </i>
              </Link>
            </header>
            <GenreList media="movie" genreId={genreObj.id} />
          </section>
        )}
      </Page>
    </ViewTransition>
  )
}
