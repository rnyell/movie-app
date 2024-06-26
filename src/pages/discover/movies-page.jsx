import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@src/utils/icons"
import { displayedMovieGenres } from "@services"
import { useMoviesState } from "@src/store/app-context"
import GenreList from "@components/movie/genre-list"
import MovieCard from "@components/movie/movie-card"


export default function MoviesPage() {
  const [moviesState] = useMoviesState()


  return (
    <div className="page movies-page">
      <section className="hot-movies-section">
        <header className="flex">
          <h3 className="heading">Hot Movies</h3>
          <i className="icon fire-icon">
            <FireIconSolid />
          </i>
        </header>
        <div className="movie-list snap-x-proximity">
          {moviesState.popular.map(movie => (
            <MovieCard
              key={movie.id}
              result={movie}
              media="movie"
              variant="common"
            />
          ))}
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
    </div>
  )
}
