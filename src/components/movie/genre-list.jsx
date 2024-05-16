import { useEffect, useState } from "react"
import { getMediaByGenre } from "@utils/apis"
import MovieCard from "./movie-card"

export default function GenreList({ media, genreId }) {
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const data = await getMediaByGenre(media, genreId)
    setResults(data)
    setIsLoading(false)
  }


  return (
    isLoading ? (
      <p>loading</p>
    ) : (
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
  )
}
