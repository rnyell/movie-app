import { useLoader } from "@lib/hooks"
import { getRecommendedMovies, getRecommendedSeries } from "@services"
import { Snap } from "@lib/ui/components"
import { CardsSkeleton } from "@components/skeletons"
import MovieCard from "@components/movie-cards/movie-card"

export default function RecommendSection() {
  const { data: recMovies, isLoading: isMoviesLoading } = useLoader(
    () => getRecommendedMovies(872585)
  )

  const { data: recSeries, isLoading: isSeriesLoading } = useLoader(
    () => getRecommendedSeries(1396)
  )

  return (
    <>
      <section className="recommend-section">
        <header className="mb-3">
          <h4>Recommended Movies</h4>
        </header>
        <div>
          {isMoviesLoading ? (
            <CardsSkeleton cardVariant="common" />
          ) : (
            <Snap.Container>
              {recMovies.map((movie) => (
                <Snap.Item key={movie.id}>
                  <MovieCard result={movie} media="movie" variant="common" />
                </Snap.Item>
              ))}
            </Snap.Container>
          )}
        </div>
      </section>
      <section className="recommend-section">
        <header className="mb-3">
          <h4>Top Series</h4>
        </header>
        <div className="h-full">
          {isSeriesLoading ? (
            <CardsSkeleton cardVariant="common" />
          ) : (
            <Snap.Container>
              {recSeries.map((movie) => (
                <Snap.Item key={movie.id}>
                  <MovieCard result={movie} media="tv" variant="common" />
                </Snap.Item>
              ))}
            </Snap.Container>
          )}
        </div>
      </section>
    </>
  )
}
