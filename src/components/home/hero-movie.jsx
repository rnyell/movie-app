import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  StarIcon,
  BookmarkIcon,
  PlayIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/outline"

import { useLocalStorage } from "@utils/hooks"
import { getMovieDetails } from "@utils/apis"
import {
  getMovieGenres,
  getMovieDirector,
  formatRate,
  formatReleaseDate
} from "@utils/utils"
import { useUserState } from "@src/store/app-context"
import { HeroMovieLoadingSkeleton } from "@components/skeletons"
import Casts from "@components/movie/casts"


export default function HeroMovie({ movie, showNextMovie, showPrevMovie }) {
  const {userState, userDispatch} = useUserState()
  const [isLoading, setIsLoading] = useState(true)
  const [movieDetails, setMovieDetails] = useState({})
  const media = "movie"
  //? useState({}) is fine but useState() caues error!
  const [isBookmarked, setIsBookmarked] = useState()
  const [, setBookmarkedLS] = useLocalStorage("bookmarked", userState.bookmarked)
  const [, setPlayedLS] = useLocalStorage("played", userState.played)
  const [key, setKey] = useState(0) // for <AnimatePresence> purposes
  const navigate = useNavigate()

  useEffect(() => {
    console.log("hero movie re-rendered")
    loadData()
    setKey(key + 1)
    
    const foundIndex = userState.bookmarked.findIndex(bookm =>
      bookm.id === movie.id && bookm.media === media
    )
    const isFound = foundIndex !== -1
    setIsBookmarked(isFound)

    return () => {
      setPlayedLS(userState.played)
    }
  }, [movie.id])

  useEffect(() => {
    // any better way to update local storage?
    setBookmarkedLS(userState.bookmarked)
  }, [isBookmarked])

  async function loadData() {
    const data = await getMovieDetails(movie.id)
    setMovieDetails(data)
    setIsLoading(false)
  }

  const {
    id,
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

  function playMovie(id) {
    userDispatch({ type: "played", id })
    navigate("/player", { state: { id } })
  }

  const staggerChildren = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {}
  }

  const itemsA = {
    initial: {
      opacity: 0.2,
      y: -18
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -13
    },
  }

  const itemsB = {
    initial: {
      opacity: 0.15,
      y: 8
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: 5
    },
  }

  return isLoading ? (
    <HeroMovieLoadingSkeleton />
  ) : (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="hero-movie"
        key={key}
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="grid-container">
          <motion.div
            className="ambient"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0.1 }}
          >
            <img className="unselectable" src={`https://image.tmdb.org/t/p/original${bg_path}`} draggable={false} />
          </motion.div>
          <motion.div
            className="bg-poster"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original${bg_path}")`
            }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
          />
          <motion.div
            className="grid-item-title"
            variants={staggerChildren}
          >
            <motion.h2 className="title" variants={itemsA}>{title}</motion.h2>
            <motion.span className="release-date" variants={itemsB}>
              {formatReleaseDate(release_date)}
            </motion.span>
            <motion.p className="genres" variants={itemsB}>
              {getMovieGenres(genres)}
            </motion.p>
          </motion.div>
          <div className="cta-btns">
            <button className="btn btn-shared watch-btn" onClick={() => playMovie(id)}>
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
              onClick={() => bookmarkMovie(id)}
            >
              <i className="icon">
                <BookmarkIcon />
              </i>
            </button>
          </div>
          <p className="tagline">{tagline}</p>
          <motion.div className="rate" variants={itemsB}>
            <div className="helper-div">
              <i className="icon">
                <StarIcon />
              </i>
              <p>{formatRate(rate)}</p>
            </div>
          </motion.div>
          <motion.div className="director" variants={staggerChildren}>
            <motion.p variants={itemsB}>Directed by</motion.p>
            <motion.p className="director-name" variants={itemsB}>{getMovieDirector(credits.crew)}</motion.p>
          </motion.div>
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
      </motion.div>
    </AnimatePresence>
  )
}
