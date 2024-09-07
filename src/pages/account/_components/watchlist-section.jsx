import { Link } from "react-router-dom"
import { getWatchLaterItems, getWatchLaterListId } from "@lib/supabase/db"
import { usePostgresChanges } from "@lib/supabase/realtime"
import { useLoader } from "@lib/hooks"
import { BookmarkIcon } from "@heroicons/outline"
import { Snap } from "@lib/ui/components"
import { CardsSkeleton } from "@components/skeletons"
import MovieCard from "@components/movie-cards/movie-card"

/* //~TODO:
  1. change view: list or grid
  2. sort base on the time movie is watched
  3. filter movie or tv show on WatchlistSection
  4. a dropdown menu for these (sorting filtering etc.) also with a "delete all"
*/

export default function WatchlistSection() {
  const { data: listId } = useLoader(getWatchLaterListId)
  const { data, setData, isLoading } = useLoader(getWatchLaterItems)
  const isEmpty = data?.length === 0

  usePostgresChanges(
    (payload) => {
      if (payload.eventType === "DELETE") {
        const deleted = payload.old
        setData((bookmarks) =>
          bookmarks.filter((book) => book.id !== deleted.id)
        )
      }
    },
    { event: "DELETE", table: "bookmarks" }
  )

  return (
    <section>
      <header className="flex">
        <h3 className="mb-5">WatchlistSection</h3>
        <div className="ml-auto align-center gap-4">
          <Link
            className="p-2 text-sm rounded-md hover:bg-primary-700"
            to="/account/lists/p"
            state={{ listId, listName: "WatchlistSection" }}
          >
            View All
          </Link>
        </div>
      </header>
      <>
        {isLoading ? (
          <CardsSkeleton cardVariant="bookmark" />
        ) : isEmpty ? (
          <div className="empty-WatchlistSection-msg empty-msg">
            <p>Your WatchlistSection is currently empty.</p>
            <p>
              To keep track of the stuff you want to watch, just tap the
              bookmark icon:{" "}
              <i className="icon">
                <BookmarkIcon />
              </i>
            </p>
          </div>
        ) : (
          <Snap.Container className="p-5 gap-7">
            {data?.slice(0, 12).map((item) => (
              <Snap.Item align="center" key={item.id}>
                <MovieCard
                  variant="bookmarked"
                  listId={item.list_id}
                  result={item.id}
                  media={item.media}
                />
              </Snap.Item>
            ))}
          </Snap.Container>
        )}
      </>
    </section>
  )
}
