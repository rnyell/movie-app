import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon } from "@heroicons/outline"
import {
  readLocalStorage,
  formatRuntime,
  getMovieGenres,
  formatRate
} from "@src/utils/utils"
import { useLocalStorage } from "@src/utils/hooks"
import { useUserState } from "@src/store/app-context"
import SideNav from "@components/sidenav"
import Header from "@components/header"
import MovieCard from "@components/movie/movie-card"

export default function UserStuff() {
  const [played, setPlayed] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const {userState, userDispatch} = useUserState()
  const [, setBookmarks] = useLocalStorage("bookmarked", userState.bookmarked)

  useEffect(() => {
    setWatchlist(readLocalStorage("bookmarked"))
  }, [])

  function clearAllBookmarks() {
    userDispatch({ type: "remove_all_bookmark" })
    setBookmarks(userState.bookmarked)
    setWatchlist([])
  }

  return (
    <div className="userstuff-page main-layout">
      <SideNav />
      <main>
        <Header dataset="discover default" />
        <section className="played-section">
          <h4 className="heading">Played History</h4>
          <div className="played-container container">
            {played.length === 0 ? (
              <div className="empty-history-msg empty-msg">
                <p>You haven't watched any movies yet.</p>
                <p>Let's <Link to="/discover">explore</Link> some movies!</p>
              </div>
            ) : (
              <div>

              </div>
            )}
          </div>
          {played.length !== 0 && (
            <div className="cta">
              <button className="btn">Remove History</button>
            </div>
          )}
        </section>
        <section className="watchlist-section">
          <h4 className="heading">Your Watchlist</h4>
          <div className="movies-container container">
            {watchlist.length === 0 ? (
              <div className="empty-watchlist-msg empty-msg">
                <p>Your watchlist is currently empty.</p>
                <p>You can add your desired movies or series to watchlist with bookmark button: <i className="icon"><BookmarkIcon /></i></p>
              </div>
            ) : (watchlist.map(id =>
              <div className="grid-item" key={id}>
                <MovieCard result={id} type="bookmarked" />
              </div>
            ))}
          </div>
          {watchlist.length !== 0 && (
            <div className="cta">
              <button className="btn" onClick={clearAllBookmarks}>Clear All</button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
