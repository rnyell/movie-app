import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useLocalStorage } from "@utils/hooks"
import { useUserState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"
import EmptyHistory from "@components/library/empty-history"
import EmptyWatchlist from "@components/library/empty-watchlist"
import ConfirmModal from "@components/ui/modals/confirm-modal"

/*
TODO:
  1. change view: list or grid
  2. sort base on the time movie is watched
  3. filter movie or tv show on watchlist
*/

export default function Library() {
  const {userState, userDispatch} = useUserState()
  const [, setBookmarksOnLS] = useLocalStorage("bookmarked", userState.bookmarked)
  const [, setPlayedOnLS] = useLocalStorage("played", userState.played)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const confirmText = modalType === "history" ? 
    "Are you sure you want to clear your played history?" :
    "Are you sure you want to delete all your watchlist movies?";

  function clearHistory() {
    userDispatch({ type: "remove_all_played" })
    setPlayedOnLS(userState.played)
  }

  function handleClearHistoryBtn() {
    setModalType("history")
    setShowModal(true)
  }

  function clearAllBookmarks() {
    userDispatch({ type: "remove_all_bookmark" })
    setBookmarksOnLS(userState.bookmarked)
  }

  function handleClearAllBookmarksBtn() {
    setModalType("bookmark")
    setShowModal(true)
  }

  function handleSubmittedAction() {
    if (modalType === "history") {
      clearHistory()
    } else if (modalType === "bookmark") {
      clearAllBookmarks()
    }
    setShowModal(false)
  }


  return (
    <div className="page library-page">
      <section className="played-section">
        <header>
          <h2 className="heading">Played History</h2>
        </header>
        <div className="played-container container">
          {userState.played.length === 0 ? (
            <EmptyHistory />
          ) : (
            userState.played.map(id =>
              <div key={id} className="grid-item">
                <MovieCard result={id} media="movie" variant="played" />
              </div>
            )
          )}
        </div>
        {userState.played.length !== 0 && (
          <div className="cta">
            <button className="btn" onClick={handleClearHistoryBtn}>Clear History</button>
          </div>
        )}
      </section>
      <hr style={{marginInline: "auto"}} />
      <section className="watchlist-section">
        <header>
          <h2 className="heading">Watchlist</h2>
        </header>
        <div className="movies-container container">
          {userState.bookmarked.length === 0 ? (
            <EmptyWatchlist />
          ) : (userState.bookmarked.map(bookm =>
            <div className="grid-item" key={bookm.id}>
              <MovieCard
                result={bookm.id}
                media={bookm.media}
                variant="bookmarked"
              />
            </div>
          ))}
        </div>
        {userState.bookmarked.length !== 0 && (
          <div className="cta">
            <button className="btn" onClick={handleClearAllBookmarksBtn}>Delete All</button>
          </div>
        )}
      </section>
      {/* <hr style={{marginInline: "auto"}} /> */}
      {/*<section className="faved-section">
        <header>
          <h2 className="heading">Faved</h2>
        </header>
        <div className="faved-container container">
          {userState.faved.length === 0 ? (
            <EmptyFaved />
          ) : (userState.faved.map(id =>
            <div className="grid-item" key={id}>
              <MovieCard result={id} media="unknown" variant="faved"/>
            </div>
          ))}
        </div>
        {userState.faved.length !== 0 && (
          <div className="cta">
            <button className="btn">Unlike All</button>
          </div>
        )}
      </section>*/}
      {<AnimatePresence>
        {showModal && (
          <ConfirmModal
            confirmText={confirmText}
            setModal={setShowModal}
            handleSubmittedAction={handleSubmittedAction}
          />
        )}
      </AnimatePresence>}
    </div>
  )
}
