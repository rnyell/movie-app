import { useAppContext } from "@src/store"
import { ViewTransition } from "@lib/motion"
import Page from "@components/layouts/page"
import MovieCard from "@components/movie-cards/movie-card"

import "./page.css"

export default function ScreenMovies() {
  const { moviesState } = useAppContext()

  return (
    <ViewTransition>
      <Page pageName="screen-movies">
        <section>
          <header className="page-header">
            <h2>Currently In Cinema</h2>
            <p>Grab Your Popcorn!🍿</p>
          </header>
          <div className="movies-container">
            {moviesState.screen.map((movie, idx) => (
              <MovieCard
                key={movie.id}
                result={movie}
                idx={idx}
                media="movie"
                variant="screen"
              />
            ))}
          </div>
        </section>
      </Page>
    </ViewTransition>
  )
}
