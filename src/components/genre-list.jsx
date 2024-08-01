import { getMediaByGenre } from "@services"
import { useLoader } from "@src/lib/hooks"
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
    <div className="genre-list snap-x-proximity">
      {results.map(result => (
        <MovieCard
          key={result.id}
          result={result}
          media={media}
          variant="common"
        />
      ))}
    </div>
  )
}
