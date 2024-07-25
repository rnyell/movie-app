import { useState } from "react"
import { getWatchLaterItems } from "@src/lib/supabase/db"
import { useUserContext } from "@src/store/user-context"
import { EllipsisVerticalIcon } from "@heroicons/outline"
import { useLoader } from "@src/lib/hooks"
import ViewTransition from "@lib/motion/view-transition"
import Presence from "@src/lib/motion/presence"
import Page from "@components/layouts/page"
import { Button, Divider, Icon } from "@src/lib/ui/components"
import MovieCard from "@components/movie-cards/movie-card"
import ConfirmModal from "@components/modals/confirm-modal"
import EmptyHistory from "./_components/empty-history"
import EmptyWatchlist from "./_components/empty-watchlist"

/*
TODO:
  1. change view: list or grid
  2. sort base on the time movie is watched
  3. filter movie or tv show on watchlist
  4. a dropdown menu for these (sorting filtering etc.) also with a "delete all" option for `handleClearAllBookmarksBtn`
*/

export default function Account() {
  const {userState} = useUserContext()
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const confirmText = modalType === "history" ?
    "Are you sure you want to clear your played history?" :
    "Are you sure you want to delete all your watchlist movies?";

  const { data: watchLaterItems, isLoading, error } = useLoader(getWatchLaterItems)

  function clearHistory() {}

  function handleClearHistoryBtn() {
    setModalType("history")
    setShowModal(true)
  }

  function clearAllBookmarks() {}

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
    <ViewTransition>
      <Page pageName="account">
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
              <EmptyHistory />
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
                onClick={handleClearHistoryBtn}
              >
                Clear History
              </Button>
            </div>
          )}
        </section>
        <Divider />
        <section className="watchlist-section">
          <header className="flex">
            <h3 className="heading">Watchlist</h3>
            <Button
              variants="ghost"
              size="square-md"
              iconOnly
              svg={<EllipsisVerticalIcon />}
            />
          </header>
          <div className="movies-container container">
            {watchLaterItems?.length === 0 ? (
              <EmptyWatchlist />
            ) : (watchLaterItems?.map(item =>
              <div className="grid-item" key={item.id}>
                <MovieCard
                  result={item.id}
                  media={item.media}
                  variant="bookmarked"
                />
              </div>
            ))}
          </div>
          {watchLaterItems?.length !== 0 && (
            <div className="cta">
              <Button
                variants="danger"
                size="lg"
                customStyles="ml-auto"
                onClick={handleClearAllBookmarksBtn}
              >
                Delete All
              </Button>
            </div>
          )}
        </section>
        {<Presence trigger={showModal}>
          <ConfirmModal
            confirmText={confirmText}
            setModal={setShowModal}
            handleSubmittedAction={handleSubmittedAction}
          />
        </Presence>}
      </Page>
    </ViewTransition>
  )
}
