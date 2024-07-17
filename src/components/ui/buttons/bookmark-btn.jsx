import { useEffect, useState } from "react"
import { BookmarkIcon } from "@heroicons/outline"
import { isItemBookmarked } from "@src/lib/supabase/db"


export default function BookmarkButton({ item, setModal }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    loader()
  }, [item.id])
  
  async function loader() {
    const hasBookmarked = await isItemBookmarked(item)
    setIsBookmarked(hasBookmarked)
  }

  function showListsModal() {
    setModal(true)
  }


  return (
    <button
      className={`main-btn bookmark-btn ${isBookmarked ? "is-bookmarked" : null}`}
      type="button"
      onClick={showListsModal}
    >
      <i className="icon">
        <BookmarkIcon />
      </i>
    </button>
  )
}
