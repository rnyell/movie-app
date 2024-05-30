import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@src/utils/icons"
import { displayedMovieGenres } from "@services"
import GenreList from "@components/movie/genre-list"


export default function MoviesPage() {
  return (
    <>
      <section className="hot-movies-section">
        <header>
          <h4>Hot Movies</h4>
          <i className="icon fire-icon">
            <FireIconSolid />
          </i>
        </header>
        <GenreList media="movie" />
      </section>

      {displayedMovieGenres.map(genreObj => 
        <section key={genreObj.id}>
          <header>
            <h3>{genreObj.name}</h3>
            <Link to="/">
              More
              <i className="icon">
                <ChevronRightIcon />
              </i>
            </Link>
          </header>
          <GenreList media="movie" genreId={genreObj.id} />
        </section>
      )}
    </>
  )
}