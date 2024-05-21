import { BookmarkSlashIcon } from "@heroicons/solid"


export default function BookmarkDeleteButton({ setModal }) {
  return (
    <button className="main-btn bookmark-del-btn">
      <i className="icon bookmark-del-icon" onClick={() => setModal(true)}>
        <BookmarkSlashIcon />
      </i>
    </button>
  )
}
