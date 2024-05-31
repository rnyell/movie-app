import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { MOVIE_GENRES, TV_GENRES, getMediaByGenre } from "@services"
import MovieCard from "@components/movie/movie-card"


export default function GenrePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState([])
  const { id: genreId } = useParams()
  const media = location.pathname.split("/")[2] === "movies" ? "movie" : "tv"
  const genreName = media === "movie" ? MOVIE_GENRES[genreId] : TV_GENRES[genreId]

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const data = await getMediaByGenre(media, genreId)
    setResults(data)
    setIsLoading(false)
  }


  return (
    <div className="page genre-page">
      <header>
        <h2 className="heading">{genreName} {media === "movie" ? "Movies" : "Series"}</h2>
      </header>
      <div className="genre-movies-container">
        {!isLoading && (
          results.map(result =>
            <MovieCard
              key={result.id}
              result={result}
              media={media}
              variant="common"
            />
          )
        )}
      </div>
    </div>
  )
}
