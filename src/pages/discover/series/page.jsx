import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@lib/ui/icons"
import { seriesDisplayedGenres } from "@services"
import { useAppContext } from "@src/store"
import { ViewTransition } from "@lib/motion"
import { Snap } from "@lib/ui/components"
import Page from "@components/layouts/page"
import GenreList from "@components/genre-list"
import MovieCard from "@components/movie-cards/movie-card"


export default function SeriesPage() {
  const { moviesState } = useAppContext()


  return (
    <ViewTransition>
      <Page pageName="series-page">
        <section className="hot-series-section">
          <header className="flex">
            <h4 className="heading">Hot Series</h4>
            <i className="icon fire-icon">
              <FireIconSolid />
            </i>
          </header>
          <div className="h-90%">
            <Snap.Container>
              {moviesState.series.map(res => (
                <Snap.Item key={res.id}>
                  <MovieCard
                    result={res}
                    media="tv"
                    variant="common"
                  />
                </Snap.Item>
              ))}
            </Snap.Container>
          </div>
        </section>
        {seriesDisplayedGenres.map(genreObj =>
          <section key={genreObj.id}>
            <header className="flex">
              <h3 className="heading">{genreObj.name}</h3>
              <Link to={`/discover/series/${genreObj.id}`} className="align-center">
                More
                <i className="icon">
                  <ChevronRightIcon />
                </i>
              </Link>
            </header>
            <GenreList media="tv" genreId={genreObj.id} />
          </section>
        )}
      </Page>
    </ViewTransition>
  )
}
