import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@src/utils/icons"
import { seriesDisplayedGenres } from "@services"
import GenreList from "@components/movie/genre-list"


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
        <GenreList media="tv" />
      </section>

      {seriesDisplayedGenres.map(genreObj => 
        <section key={genreObj.id}>
          <header>
            <h3 className="genre-name">{genreObj.name}</h3>
            <Link to="/">
              More
              <i className="icon">
                <ChevronRightIcon />
              </i>
            </Link>
          </header>
          <GenreList media="tv" genreId={genreObj.id} />
        </section>
      )}
    </>
  )
}