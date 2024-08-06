import { getMediaByGenre } from "@services"
import { useLoader } from "@lib/hooks"
import { Snap } from "@lib/ui/components"
import MovieCard from "./movie-cards/movie-card"


export default function GenreList({ media, genreId }) {
  const { data: results, isLoading, error } = useLoader(loadData)

  async function loadData() {
    const data = await getMediaByGenre(media, genreId)
    return data
  }


  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="h-90%">
      <Snap.Container customStyles="h-100%">
        {results.map(result => (
          <Snap.Item key={result.id}>
            <MovieCard
              result={result}
              media={media}
              variant="common"
            />
          </Snap.Item>
        ))}
      </Snap.Container>
    </div>
  )
}
