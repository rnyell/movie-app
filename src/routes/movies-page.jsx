import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "../utils/icons"
import { movieDisplayedGenres } from "@src/utils/apis"

import Header from "@components/header"
import SideNav from "@components/sidenav"
import MovieList from "@components/movie/movie-list"


export default function MoviesPage() {
  return (
    <div className="movies-page">
      <SideNav />
      <main>
        <Header dataset="discover-page default" />
        <section className="hot-movies-section">
          <header>
            <h4>Hot Movies</h4>
            <i className="icon fire-icon">
              <FireIconSolid />
            </i>
          </header>
          <MovieList type="movie" />
        </section>

        <section>
          <h4>Recommend for you</h4>
          <div>

          </div>
        </section>

        {movieDisplayedGenres.map(genreObj => 
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
            <MovieList type="movie" genreId={genreObj.id} />
          </section>
        )}
      </main>
    </div>
  )
}