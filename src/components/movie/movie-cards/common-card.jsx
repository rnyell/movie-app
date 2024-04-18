import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, BookmarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { PlayIcon } from "@heroicons/solid"

import { useWindow, useLocalStorage } from "@src/utils/hooks"
import { getMovieDetails, getMovieRuntime } from "@src/utils/apis"
import { getGenresBaseOnIds, formatRate, formatRuntime, formatReleaseDate } from "@src/utils/utils"
import { useUserState } from "@src/store/app-context"


export default function CommonCard({ result, type, variant }) {
  const {windowWidth} = useWindow()
  const {userState, userDispatch} = useUserState()
  const [_, setBookmarkedLS] = useLocalStorage("bookmarked", userState.bookmarked)
  const [isBookmarked, setIsBookmarked] = useState()
  const [runtime, setRuntime] = useState(null)
  const listCardRef = useRef()
  const [listCardWidth, setListCardWidth] = useState()
  const [listCardOverlay, setListCardOverlay] = useState(false)

  useEffect(() => {
    if (type === "movie") {
      getMovieRuntime(result.id).then(d => setRuntime(d))
    }
    
    if (type === "series") {

    }

    setIsBookmarked(userState.bookmarked.includes(result.id))
  }, [])

  useEffect(() => {
    setBookmarkedLS(userState.bookmarked)
  }, [isBookmarked])

  useEffect(() => {
    if (listCardRef.current) {
      setListCardWidth(listCardRef.current.offsetWidth)
    }
  }, [windowWidth, listCardWidth])

  function bookmarkMovie(id) {
    if (!userState.bookmarked.includes(id)) {
      userDispatch({ type: "add_bookmark", id })
      setIsBookmarked(true)
    } else if (userState.bookmarked.includes(id)) {
      userDispatch({ type: "remove_bookmark", id })
      setIsBookmarked(false)
    }
  }
  
  return (
    <motion.div
      data-variant={variant}
      className="movie-card"
      ref={listCardRef}
      style={{width: "clamp(175px, 20vw, 305px)"}}
      whileHover={{width: 1.15 * listCardWidth}}
      onHoverStart={() => setListCardOverlay(true)}
      onHoverEnd={() => setListCardOverlay(false)}
    >
      <div className="wrapper">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            alt="poster" className="poster"
            draggable="false"
          />
        </figure>
        <AnimatePresence>
        {listCardOverlay &&
          <motion.div
            className="hover-overlay flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              type: "tween",
              duration: 0.2,
              ease: "easeOut" 
            }}
          >
            <h4 className="title">{result.title || result.name}</h4>
            <div className="details">
              <span className="release-date">{formatReleaseDate(result.release_date || result.first_air_date)}</span>
              <i className="dot">&#x2022;</i>
              <span className="runtime">{formatRuntime(runtime)}</span>
              <i className="dot">&#x2022;</i>
              <span className="vote">
                <span className="vote-number">{formatRate(result.vote_average)}</span>
                <i className="icon star-icon"><StarIcon /></i>
              </span>
            </div>
            <div className="cta-btns">
              <button className="btn">
                <i className="icon play-icon">
                  <PlayIcon />
                </i>
              </button>
              <button className="btn">
                <i className="icon">
                <ArrowTopRightOnSquareIcon />
                </i>
              </button>
              <button className="btn" onClick={() => bookmarkMovie(result.id)}>
                <i className={`icon ${isBookmarked ? "is-bookmarked" : null}`}>
                  <BookmarkIcon />
                </i>
              </button>
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>
      {/* <AnimatePresence>
        {listCardOverlay &&
          <div
            className="ambient"
            style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`}}
          />
        }
      </AnimatePresence> */}
    </motion.div>
  )
}
