import { useEffect, useState } from "react"
import { getItemsByGenre } from "@src/utils/apis"
import MovieCard from "./movie-card"

export default function GenreList({ type, genreId }) {
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const data = await getItemsByGenre(type, genreId)
    setResults(data)
    setIsLoading(false)
  }

  // console.log(results)
  return (
    isLoading ? (
      <p>loading</p>
    ) : (
      <div className="genre-list scroll-snap-start">
        {results.map(result => (
          <MovieCard
            key={result.id}
            result={result}
            type={type}
            variant="list"
          />
        ))}
      </div>
    )
  )
}
