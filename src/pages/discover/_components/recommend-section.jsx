import { useEffect, useState } from "react"
import { getRecommendedMovies, getRecommendedSeries } from "@services"
import { Snap } from "@lib/ui/components"
import MovieCard from "@components/movie-cards/movie-card"


export default function RecommendSection() {
  const [recMovies, setRecMovies] = useState(null)
  const [recSeries, setRecSeries] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const movies = await getRecommendedMovies(872585)
    const series = await getRecommendedSeries(1396)
    setRecMovies(movies)
    setRecSeries(series)
    setIsLoading(false)
  }


  return (
    <>
      <section className="recommend-section">
        <header>
          <h4 className="heading">Recommended Movies</h4>
        </header>
        <div className="h-90%">
          {isLoading ? <h2>loading</h2> : (
            <Snap.Container customStyles="h-100%">
              {recMovies.map(movie => (
                <Snap.Item key={movie.id}>
                  <MovieCard result={movie} media="movie" variant="common" />
                </Snap.Item>
              ))}
            </Snap.Container>
          )}
        </div>
      </section>
      <section className="recommend-section">
        <header>
          <h4 className="heading">Top Series</h4>
        </header>
        <div className="h-100%">
          {isLoading ? <h2>loading</h2> : (
            <Snap.Container customStyles="h-100%">
              {recSeries.map(movie => (
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
