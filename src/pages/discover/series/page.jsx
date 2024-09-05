import { Link } from "react-router-dom"
import { seriesDisplayedGenres } from "@services"
import { useAppContext } from "@src/store"
import { ChevronRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@lib/ui/icons"
import { ViewTransition } from "@lib/motion"
import { Snap } from "@lib/ui/components"
import Page from "@components/layouts/page"
import MovieCard from "@components/movie-cards/movie-card"
import GenreList from "../_components/genre-list"

export default function SeriesPage() {
  const { moviesState } = useAppContext()

  return (
    <ViewTransition>
      <Page className="series-page gap-16">
        <section>
          <header className="py-2.5 align-center text-yellow-500">
            <h3>Hot Series</h3>
            <i className="icon fire-icon ml-2 size-5">
              <FireIconSolid />
            </i>
          </header>
          <Snap.Container className="2xs:pt-5">
            {moviesState.series.map((ser) => (
              <Snap.Item key={ser.id}>
                <MovieCard result={ser} media="tv" variant="common" />
              </Snap.Item>
            ))}
          </Snap.Container>
        </section>
        {seriesDisplayedGenres.map((genre) => (
          <section key={genre.id}>
            <header className="align-center">
              <h3>{genre.name}</h3>
              <Link
                className="align-center"
                to={`/discover/genres?m=tv&id=${genre.id}&page=1`}
              >
                More
                <i className="icon">
                  <ChevronRightIcon />
                </i>
              </Link>
            </header>
            <GenreList media="tv" genreId={genre.id} />
          </section>
        ))}
      </Page>
    </ViewTransition>
  )
}
