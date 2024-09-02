import { useParams } from "react-router-dom"
import { getBookmarksByListId, getListsByShareId } from "@lib/supabase/db"
import { useLoader } from "@lib/hooks"
import Page from "@components/layouts/page"

export default function SelectedList() {
  const { shareId } = useParams()
  const { data: list, isLoading } = useLoader(() => getListsByShareId(shareId))
  const { data: bookmarks } = useLoader(
    () => getBookmarksByListId(list?.id),
    { dependencies: [list?.id] }
  )
  console.log(list)
  console.log(bookmarks)

  return (
    <Page>
      <h3>{list?.name}</h3>
      
    </Page>
  )
}