import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { EllipsisVerticalIcon } from "@heroicons/outline"
import { useLocalStorage } from "@utils/hooks"
import { useUserContext } from "@src/store/user-context"
import MovieCard from "@components/movie/movie-card"
import EmptyHistory from "@components/account/empty-history"
import EmptyWatchlist from "@components/account/empty-watchlist"
import ConfirmModal from "@components/ui/modals/confirm-modal"

/*
TODO:
  1. change view: list or grid
  2. sort base on the time movie is watched
  3. filter movie or tv show on watchlist
  4. a dropdown menu for these (sorting filtering etc.) also with a "delete all" option for `handleClearAllBookmarksBtn`
*/

export default function Account() {
  const {userState, userDispatch} = useUserContext()
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
    <div className="page account">
      <section className="played-section">
        <header className="align-center">
          <h3 className="heading">Played History</h3>
          <button className="btn option-btn" type="button">
            <i className="icon">
              <EllipsisVerticalIcon />
            </i>
          </button>
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
            <button className="btn" type="button" onClick={handleClearHistoryBtn}>Clear History</button>
          </div>
        )}
      </section>
      <hr style={{marginInline: "auto"}} />
      <section className="watchlist-section">
        <header className="flex">
          <h3 className="heading">Watchlist</h3>
          <button className="btn option-btn" type="button">
            <i className="icon">
              <EllipsisVerticalIcon />
            </i>
          </button>
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
            <button className="btn" type="button" onClick={handleClearAllBookmarksBtn}>Delete All</button>
          </div>
        )}
      </section>
      {/* <hr style={{marginInline: "auto"}} /> */}
      {/*<section className="faved-section">
        <header>
          <h3 className="heading">Faved</h3>
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
            <button className="btn" type="button">Unlike All</button>
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
