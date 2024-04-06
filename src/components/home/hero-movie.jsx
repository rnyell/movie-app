import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
  StarIcon,
  BookmarkIcon,
  PlayIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/outline"

import { getMovieDetails } from "@src/utils/apis"
import {
  formatRuntime,
  getMovieGenres,
  getMovieDirector,
  formatRate,
} from "@src/utils/utils"
import { useUserState } from "@src/store/app-context"
import { HeroMovieLoadingSkeleton } from "@components/skeletons"
import Casts from "@components/movie/casts"


export default function HeroMovie({ movie, showNextMovie, showPrevMovie }) {
  const {userDispatch, userState} = useUserState()
  const [isLoading, setIsLoading] = useState(true)
  const [movieDetails, setMovieDetails] = useState("")
  const [isBookmarked, setIsBookmarked] = useState()

  useEffect(() => {
    loadData()
    setIsBookmarked(userState.bookmarked.includes(movie.id))
    console.log("hero movie re-rendered")
  }, [movie.id, isBookmarked])

  async function loadData() {
    const data = await getMovieDetails(movie.id)
    setMovieDetails(data)
    setIsLoading(false)
  }

  const {
    title,
    release_date,
    // runtime,
    genres,
    vote_average: rate,
    overview: plot,
    tagline,
    poster_path,
    backdrop_path: bg_path,
    credits,
    videos,
    images, // Obj[] => e.file_path
    // budget,
    // revenue
  } = movieDetails

  // console.log(movieDetails)

  function bookmarkMovie(id) {
    if (!userState.bookmarked.includes(id)) {
      userDispatch({ type: "add_bookmark", id })
      setIsBookmarked(true)
    } else if (userState.bookmarked.includes(id)) {
      userDispatch({ type: "remove_bookmark", id })
      setIsBookmarked(false)
    }
  }

  const posterVariants = {
    init: {
      opacity: 0.5,
      transition: { duration: 0.2 },
    },
    anime: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  }

  return isLoading ? (
    <HeroMovieLoadingSkeleton />
  ) : (
    <div className="hero-movie">
      <AnimatePresence>
        <div className="grid-container">
          <div className="ambient">
            <img src={`https://image.tmdb.org/t/p/original${bg_path}`} draggable={false} />
          </div>
          <motion.div className="bg-poster" style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original${bg_path}")`,
            }}
          />
          <div className="grid-item-title">
            <h2 className="title">{title}</h2>
            <span className="release-date">{release_date.slice(0, 4)}</span>
            <p className="genres">{getMovieGenres(genres)}</p>
          </div>
          <div className="cta-btns">
            <button className="btn btn-shared watch-btn">
              <i className="icon">
                <PlayIcon />
              </i>
              <span>Watch</span>
            </button>
            <button className="btn btn-shared trailer-btn">
              <span>Trailer</span>
            </button>
            <button 
              className={
                `btn btn-shared bookmark-btn ${isBookmarked ? "is-bookmarked" : null}`
              }
              onClick={() => bookmarkMovie(movie.id)}
            >
              <i className="icon">
                <BookmarkIcon />
              </i>
            </button>
          </div>
          <p className="tagline">{tagline}</p>
          <div className="rate">
            <div className="helper-div">
              <i className="icon">
                <StarIcon />
              </i>
              <p>{formatRate(rate)}</p>
            </div>
          </div>
          <div className="director">
            <p>Directed by</p>
            <p className="director-name">{getMovieDirector(credits.crew)}</p>
          </div>
          <Casts casts={credits.cast} />
          <div className="btns">
            <button className="btn btn-shared" onClick={() => showPrevMovie(1)}>
              <ChevronLeftIcon />
            </button>
            <button className="btn btn-shared" onClick={() => showNextMovie(1)}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </AnimatePresence>
    </div>
  )
}
