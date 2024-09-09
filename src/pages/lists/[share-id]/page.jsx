import { useParams } from "react-router-dom"
import { getBookmarksByListId, getListByShareId } from "@lib/supabase/db"
import { usePostgresChanges } from "@lib/supabase/realtime"
import { useLoader } from "@lib/hooks"
import Page from "@components/layouts/page"
import MovieCard from "@components/movie-cards/movie-card"

import styles from "../helper.module.css"

export default function PublicList() {
  const { shareId } = useParams()
  const { data: list } = useLoader(() => getListByShareId(shareId))
  const {
    data: bookmarks,
    setData: setBookmarks,
    isLoading,
  } = useLoader(() => getBookmarksByListId(list?.id), {
    dependencies: [list?.id],
  })

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
      <h3>{list?.name}</h3>
      <div className={`${styles.container} pt-12 pb-16`}>
        {bookmarks?.map((bookmark) => (
          <MovieCard
            variant="bookmarked"
            result={bookmark.id}
            media={bookmark.media}
            listId={bookmark.list_id}
            key={bookmark.id}
          />
        ))}
      </div>
    </Page>
  )
}
