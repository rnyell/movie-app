import { BookmarkIcon } from "@heroicons/outline"

export default function EmptyWatchlist() {
  return (
    <div className="empty-watchlist-msg empty-msg">
      <p>Your watchlist is currently empty.</p>
      <p>To keep track of the stuff you want to watch, just tap the bookmark icon: <i className="icon"><BookmarkIcon /></i></p>
    </div>
  )
}
