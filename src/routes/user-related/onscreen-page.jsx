import { useMovieState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"

export default function OnScreenPage() {
  const [movieState] = useMovieState()
  

  return (
    <div className="onscreen-page">
      <section>
        <header className="flex-y-center">
          <h4>Currently In Cinema</h4>
        </header>
        <div className="movies-container">
          {movieState.screen.map(movie => (
            <MovieCard
              key={movie.id}
              result={movie}
              type="movie"
              variant="screen"
            />
          ))}
        </div>
      </section>
    </div>
  )
}