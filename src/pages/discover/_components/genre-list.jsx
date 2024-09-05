import { getResultsByGenre } from "@services"
import { useLoader } from "@lib/hooks"
import { Snap } from "@lib/ui/components"
import MovieCard from "@components/movie-cards/movie-card"
import { CardSkeleton } from "@components/skeletons"

export default function GenreList({ media, genreId }) {
  const { data, isLoading } = useLoader(() => getResultsByGenre(media, genreId))

  return (
    <div>
      <Snap.Container className="h-full 2xs:pt-5">
        {data?.results?.map((result) => (
          <Snap.Item key={result.id}>
            {isLoading ? (
              <CardSkeleton variant="common" />
            ) : (
              <MovieCard result={result} media={media} variant="common" />
            )}
          </Snap.Item>
        ))}
      </Snap.Container>
    </div>
  )
}
