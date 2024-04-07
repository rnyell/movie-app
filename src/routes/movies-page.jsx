import Header from "@components/header"
import SideNav from "@components/sidenav"
import MovieList from "@components/movie/movie-list"

export default function MoviesPage() {
  return (
    <div className="movies-page">
      <SideNav />
      <main>
        <Header dataLocation="movies-page" />
        <section>
          <h4>Hot Movies</h4>
          <MovieList />
        </section>

        <section>
          <h4>Recommend for you</h4>
          <MovieList />
        </section>

        <section>
          <h4>Drama</h4>
          <MovieList genreId={18} />
        </section>

        <section>
          <h4>Thrillers</h4>
          <MovieList genreId={53} />
        </section>

        <section>
          <h4>Animations</h4>
          <MovieList genreId={16} />
        </section>
      </main>
    </div>
  )
}