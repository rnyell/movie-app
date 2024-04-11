import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@src/utils/icons"
import { seriesDisplayedGenres } from "@src/utils/apis"
import MovieList from "@components/movie/movie-list"


export default function SeriesPage() {
  return (
    <>
      <section className="hot-series-section">
        <header>
          <h4>Hot Series</h4>
          <i className="icon fire-icon">
            <FireIconSolid />
          </i>
        </header>
        <MovieList type="series" />
      </section>

      {seriesDisplayedGenres.map(genreObj => 
        <section key={genreObj.id}>
          <header>
            <h4>{genreObj.name}</h4>
            <Link to="/">
              More
              <i className="icon">
                <ChevronRightIcon />
              </i>
            </Link>
          </header>
          <MovieList type="series" genreId={genreObj.id} />
        </section>
      )}
    </>
  )
}