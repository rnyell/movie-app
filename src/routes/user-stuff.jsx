import { useEffect, useState } from "react"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon } from "@heroicons/outline"
import { getMovieDetails } from "@src/utils/apis"
import {
  readLocalStorage,
  formatRuntime,
  getMovieGenres,
  formatRate
} from "@src/utils/utils"
import SideNav from "@components/sidenav"
import Header from "@components/header"

export default function UserStuff() {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    setWatchlist(readLocalStorage("bookmarked"))
  }, [])

  return (
    <div className="userstuff-page">
      <SideNav />
      <main>
        <Header dataset="discover default" />
        <section className="watchlist-section">
          <h4>Your Watchlist</h4>
          <div className="movies-container">
            {watchlist.map(id =>
              <BookmarkedMovie key={id} id={id} />
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

function BookmarkedMovie({ id }) {
  const [movieDetails, setMovieDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadMovie()
  }, [])

  async function loadMovie() {
    const data = await getMovieDetails(id)
    setMovieDetails(data)
    setIsLoading(false)
  }

  const {
    title,
    release_date,
    runtime,
    genres,
    vote_average,
    overview: plot,
    tagline,
    poster_path,
    backdrop_path,
    credits,
  } = movieDetails

  return (
    isLoading ? <h2>loading</h2> :
    <div className="bookmarked-movie">
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt="poster" className="poster"
          draggable="false"
        />
      </figure>
      <h5 className="title">{title}</h5>
      <div className="details">
        <span className="vote">
          <i className="icon star-icon"><StarIcon /></i>
          <span className="vote-number">{formatRate(vote_average)}</span>
        </span>
      </div>
    </div>
  )
}