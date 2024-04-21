import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon } from "@heroicons/outline"
import { useLocalStorage } from "@utils/hooks"
import { useUserState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"

export default function UserStuff() {
  const {userState, userDispatch} = useUserState()
  const [, setBookmarksOnLS] = useLocalStorage("bookmarked", userState.bookmarked)
  const [, setPlayedOnLS] = useLocalStorage("played", userState.played)
  const [showModal, setShowModal] = useState(false)

  function clearHistory() {
    userDispatch({ type: "remove_all_played" })
    setPlayedOnLS(userState.played)
  }

  function clearAllBookmarks() {
    userDispatch({ type: "remove_all_bookmark" })
    setBookmarksOnLS(userState.bookmarked)
  }

  function clearBookmark(id) {
    userDispatch({ type: "remove_bookmark", id })
    setBookmarksOnLS(userState.bookmarked)
  }

  function hideConfirmationBox() {
    clearAllBookmarks()
    setShowModal(false)
  }

  const ConfirmationBox = () => (
    <>
      <div className="bookmark-confirmation-box-backdrop" onClick={() => setShowModal(false)}></div>
      <motion.div
        className="bookmark-confirmation-box"
        initial={{ y: -50, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <p>Are you sure you want to all your watchlist movies?</p>
        <div className="btns">
          <button className="btn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="btn del-btn" onClick={hideConfirmationBox}>Delete</button>
        </div>
      </motion.div>
    </>
  )
  
  return (
    <div className="userstuff-page">
      <section className="played-section">
        <header className="flex-y-center">
          <h4 className="heading">Played History</h4>
          {/* <i className="icon">
            TODO: 1. change view: list or grid
                  2. sort base on the time movie is watched
          </i> */}
        </header>
        <div className="played-container container">
          {userState.played.length === 0 ? (
            <div className="empty-history-msg empty-msg">
              <p>You haven't watched any movies yet.</p>
              <p>Let's <Link to="/discover">explore</Link> some movies!</p>
            </div>
          ) : (
            userState.played.map(id =>
              <div key={id} className="grid-item">
                <MovieCard result={id} type="unknown" variant="played" />
              </div>
            )
          )}
        </div>
        {userState.played.length !== 0 && (
          <div className="cta">
            <button className="btn" onClick={clearHistory}>Remove History</button>
          </div>
        )}
      </section>
      <hr style={{marginInline: "auto"}} />
      <section className="watchlist-section">
        <header className="flex-y-center">
          <h4 className="heading">Watchlist</h4>
        </header>
        <div className="movies-container container">
          {userState.bookmarked.length === 0 ? (
            <div className="empty-watchlist-msg empty-msg">
              <p>Your watchlist is currently empty.</p>
              <p>To keep track of the stuff you want to watch, just tap the bookmark icon: <i className="icon"><BookmarkIcon /></i></p>
            </div>
          ) : (userState.bookmarked.map(id =>
            <div className="grid-item" key={id}>
              <MovieCard
                result={id}
                type="unknown"
                variant="bookmarked"
                clearBookmark={clearBookmark}
              />
            </div>
          ))}
        </div>
        {userState.bookmarked.length !== 0 && (
          <div className="cta">
            <button className="btn" onClick={() => setShowModal(true)}>Clear All</button>
          </div>
        )}
      </section>
      {createPortal(
        <AnimatePresence>
          {showModal && <ConfirmationBox />}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
