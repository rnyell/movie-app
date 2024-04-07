import { useEffect, useState } from "react"
import { getItemsByGenre } from "../../utils/apis"
import MovieCard from "./movie-card"

export default function MovieList({ type, genreId }) {
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

  return (
    isLoading ? (
      <p>loading</p>
    ) : (
      <div className="movie-list">
        {results.map(result => <MovieCard key={result.id} result={result} type="list" />)}
      </div>
    )
  )
}
