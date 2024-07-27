import { Suspense, useState } from "react"
import { getWatchLaterItems } from "@src/lib/supabase/db"
import { BookmarkIcon } from "@heroicons/outline"
import { useLoader } from "@src/lib/hooks"
import Presence from "@src/lib/motion/presence"
import { Button } from "@src/lib/ui/components"
import { EllipsisVerticalIcon } from "@heroicons/solid"
import MovieCard from "@components/movie-cards/movie-card"
import ConfirmModal from "@components/modals/confirm-modal"

/* //~TODO:
  1. change view: list or grid
  2. sort base on the time movie is watched
  3. filter movie or tv show on watchlist
  4. a dropdown menu for these (sorting filtering etc.) also with a "delete all" option for `handleClearAllBookmarksBtn`
*/

export default function Watchlist() {
  const [showModal, setShowModal] = useState(false)
  const { data: watchLaterItems, isLoading, error } = useLoader(getWatchLaterItems)


  return (
    <section className="watchlist-section">
      <header className="flex">
        <h3 className="heading">Watchlist</h3>
        <Button
          variants="ghost"
          size="square-xs"
          customStyles="ml-auto"
          iconOnly
          iconSize="lg"
          svg={<EllipsisVerticalIcon />}
        />
      </header>
      <div className="movies-container container">
        {isLoading ? <h2>Loading</h2> : watchLaterItems?.length === 0 ? (
          <div className="empty-watchlist-msg empty-msg">
            <p>Your watchlist is currently empty.</p>
            <p>To keep track of the stuff you want to watch, just tap the bookmark icon: <i className="icon"><BookmarkIcon /></i></p>
          </div>
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
          >
            Delete All
          </Button>
        </div>
      )}
      {<Presence trigger={showModal}>
        <ConfirmModal
          confirmText="Are you sure you want to delete all your watchlist movies?"
          setModal={setShowModal}
        />
      </Presence>}
    </section>
  )
}
