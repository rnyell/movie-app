import { useLocation } from "react-router-dom"
import { getBookmarksByListId } from "@lib/supabase/db"
import { usePostgresChanges } from "@lib/supabase/realtime"
import { useLoader } from "@lib/hooks"
import Page from "@components/layouts/page"
import MovieCard from "@components/movie-cards/movie-card"

import styles from "../helper.module.css"

export default function PrivateList() {
  const { state } = useLocation()
  const {
    data: bookmarks,
    setData: setBookmarks,
    isLoading,
  } = useLoader(() => getBookmarksByListId(state?.listId))

  usePostgresChanges(
    (payload) => {
      if (payload.eventType === "DELETE") {
        const deleted = payload.old
        setBookmarks((bookmarks) =>
          bookmarks.filter((book) => book.id !== deleted.id)
        )
      }
    },
    { event: "*", table: "bookmarks" }
  )

  if (isLoading) {
    return null
  }

  return (
    <Page>
      <h2>{state?.listName}</h2>
      <div className={`${styles.bookmarksContainer} pt-12 pb-16`}>
        {bookmarks?.map((bookmark) => (
          <MovieCard
            variant="bookmarked"
            result={bookmark.id}
            media={bookmark.media}
            listId={state?.listId}
            key={bookmark.id}
          />
        ))}
      </div>
    </Page>
  )
}
