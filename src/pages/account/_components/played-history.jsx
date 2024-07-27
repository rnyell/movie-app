import { useState } from "react"
import { Link } from "react-router-dom"
import { useUserContext } from "@src/store"
import Presence from "@src/lib/motion/presence"
import { Button } from "@src/lib/ui/components"
import { EllipsisVerticalIcon } from "@heroicons/solid"
import MovieCard from "@components/movie-cards/movie-card"
import ConfirmModal from "@components/modals/confirm-modal"


export default function PlayedHistory() {
  const { userState } = useUserContext()
  const [showModal, setShowModal] = useState(false)


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
          >
            Clear History
          </Button>
        </div>
      )}

      {<Presence trigger={showModal}>
        <ConfirmModal
          confirmText="Are you sure you want to clear your played history? (This action can be undone later.)"
          setModal={setShowModal}
        />
      </Presence>}
    </section>
  )
}
