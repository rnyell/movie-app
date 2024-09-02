import { Link } from "react-router-dom"
import { useAppContext } from "@src/store"
import { getPlayedMoviesFromUser } from "@lib/supabase/db"
import { useLoader } from "@lib/hooks"
import { Button, Snap } from "@lib/ui/components"
import MovieCard from "@components/movie-cards/movie-card"
import Header from "./header"


export default function WatchHistory() {
  const { modalDispatch } = useAppContext()
  const { data: playedMovies, isLoading } = useLoader(getPlayedMoviesFromUser)

  function clearPlayedHistory() {
    modalDispatch({
      type: "confirm_modal",
      data: {
        msg: "Are you sure you want to clear your played history? (This action can be undone later.)"
      }
    })
  }

  return (
    <section>
      <Header heading="Played History" />
      <>
        {playedMovies?.length === 0 ? (
          <div className="empty-history-msg empty-msg">
            <p>You haven't watched any movies yet.</p>
            <p>Let's <Link to="/discover">explore</Link> some movies!</p>
          </div>
        ) : (
          <Snap.Container>
            {playedMovies?.map(id => (
              <Snap.Item key={id}>
                <MovieCard
                  result={id}
                  media="movie"
                  variant="played"
                />
              </Snap.Item>
            ))}
          </Snap.Container>
        )}
      </>
      {playedMovies?.length !== 0 && (
        <div className="flex mt-6">
          <Button
            variants="danger"
            customStyles="ml-auto"
            onClick={clearPlayedHistory}
          >
            Clear History
          </Button>
        </div>
      )}
    </section>
  )
}
