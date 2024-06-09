import { useEffect, useState } from "react"
import { BookmarkIcon } from "@heroicons/outline"
import { useLocalStorage } from "@utils/hooks"
import { useUserState } from "@src/store/app-context"


export default function BookmarkButton({ item }) {
  const {id, media} = item
  const {userState, userDispatch} = useUserState()
  const [, setBookmarkedLS] = useLocalStorage("bookmarked", userState.bookmarked)
  const [isBookmarked, setIsBookmarked] = useState()

  useEffect(() => {
    const foundIndex = userState.bookmarked.findIndex(bookm => bookm.id === id)
    const isFound = foundIndex !== -1
    setIsBookmarked(isFound)
  }, [])

  useEffect(() => {
    setBookmarkedLS(userState.bookmarked)
  }, [isBookmarked])

  function bookmarkMovie() {
    const foundIndex = userState.bookmarked.findIndex(bookm => bookm.id === id)
    const isFound = foundIndex !== -1 ? true : false

    if (isFound) {
      userDispatch({ type: "remove_bookmark", media, id })
      setIsBookmarked(false)
    } else {
      userDispatch({ type: "add_bookmark", media, id })
      setIsBookmarked(true)
    }
  }


  return (
    <button
      className={`main-btn bookmark-btn ${isBookmarked ? "is-bookmarked" : null}`}
      onClick={bookmarkMovie}
    >
      <i className="icon">
        <BookmarkIcon />
      </i>
    </button>
  )
}
