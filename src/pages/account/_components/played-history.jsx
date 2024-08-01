import { Link } from "react-router-dom"
import { useAppContext, useUserContext } from "@src/store"
import { Button } from "@src/lib/ui/components"
import { EllipsisVerticalIcon } from "@heroicons/solid"
import MovieCard from "@components/movie-cards/movie-card"


export default function PlayedHistory() {
  const { modalDispatch } = useAppContext()
  const { userState } = useUserContext()

  function clearPlayedHistory() {
    modalDispatch({
      type: "confirm_modal",
      data: {
        msg: "Are you sure you want to clear your played history? (This action can be undone later.)"
      }
    })
  }


  return (
    <section className="played-section">
      <header className="align-center">
        <h3 className="heading">Played History</h3>
        <Button
          variants="ghost"
          size="square-xs"
          customStyles="ml-auto"
          iconOnly
          iconSize="lg"
          svg={<EllipsisVerticalIcon />}
        />
      </header>
      <div className="played-container container">
        {userState.playedMovies.length === 0 ? (
          <div className="empty-history-msg empty-msg">
            <p>You haven't watched any movies yet.</p>
            <p>Let's <Link to="/discover">explore</Link> some movies!</p>
          </div>
        ) : (
          userState.playedMovies.map(id =>
            <div key={id} className="grid-item">
              <MovieCard result={id} media="movie" variant="played" />
            </div>
          )
        )}
      </div>
      {userState.playedMovies.length !== 0 && (
        <div className="cta">
          <Button
            variants="danger"
            size="lg"
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
