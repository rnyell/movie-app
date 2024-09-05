import { useSearchParams, useLocation } from "react-router-dom"
import { MOVIE_GENRES, TV_GENRES, getResultsByGenre } from "@services"
import { ViewTransition } from "@lib/motion"
import { useLoader } from "@lib/hooks"
import { generatePagination } from "@lib/utils"
import Page from "@components/layouts/page"
import MovieCard from "@components/movie-cards/movie-card"
import Pagination from "@components/pagination"
import { CardSkeleton } from "@components/skeletons"

export default function GenrePage() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const media = searchParams.get("m")
  const genreId = searchParams.get("id")
  const currentPage = +searchParams.get("page")
  const allPagesArray = generatePagination(currentPage, 20)

  const genreName = media === "movie" ? MOVIE_GENRES[genreId] : TV_GENRES[genreId]

  let { data, isLoading } = useLoader(
    () => getResultsByGenre(media, genreId, currentPage),
    { dependencies: [location.search] }
  )

  return (
    <ViewTransition>
      <Page className="genre-page">
        <header>
          <h2>{genreName} {media === "movie" ? "Movies" : "Series"}</h2>
        </header>
        <div className="container mt-8">
          {isLoading ? (
            [...Array(20).keys()].map((_, i) => (
              <CardSkeleton variant="simple" key={i} />
            ))
          ) : (
            data?.results?.map((result) => (
              <MovieCard
                result={result}
                media={media}
                variant="simple"
                key={result.id}
              />
            ))
          )}
        </div>
        <div className="mx-auto pt-6 pb-2">
          <Pagination allPagesArray={allPagesArray} currentPage={currentPage} />
        </div>
      </Page>
    </ViewTransition>
  )
}
