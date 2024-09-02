import { getWatchLaterItems } from "@lib/supabase/db"
import { useAppContext } from "@src/store"
import { BookmarkIcon } from "@heroicons/outline"
import { useLoader } from "@lib/hooks"
import { Snap } from "@lib/ui/components"
import { CardsSkeleton } from "@components/skeletons"
import MovieCard from "@components/movie-cards/movie-card"
import Header from "./header"

/* //~TODO:
  1. change view: list or grid
  2. sort base on the time movie is watched
  3. filter movie or tv show on watchlist
  4. a dropdown menu for these (sorting filtering etc.) also with a "delete all" option for `handleClearAllBookmarksBtn`
*/

export default function Watchlist() {
  const { modalDispatch } = useAppContext()
  const { data: watchLaterItems, isLoading } = useLoader(getWatchLaterItems)
  const isEmpty = watchLaterItems?.length === 0

  return (
    <section>
      <Header heading="Watchlist" />
      <>
        {isLoading ? (
          <CardsSkeleton cardVariant="bookmark" />
        ) : isEmpty ? (
          <div className="empty-watchlist-msg empty-msg">
            <p>Your watchlist is currently empty.</p>
            <p>
              To keep track of the stuff you want to watch, just tap the
              bookmark icon:{" "}
              <i className="icon">
                <BookmarkIcon />
              </i>
            </p>
          </div>
        ) : (
          <Snap.Container customStyles="p-5">
            {watchLaterItems?.slice(0, 12).map((item) => (
              <Snap.Item align="center" key={item.id}>
                <MovieCard
                  result={item.id}
                  media={item.media}
                  variant="bookmarked"
                />
              </Snap.Item>
            ))}
          </Snap.Container>
        )}
      </>
    </section>
  )
}
