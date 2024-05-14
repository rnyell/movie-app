import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, BookmarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { PlayIcon } from "@heroicons/solid"
import { useWindow, useLocalStorage } from "@utils/hooks"
import { getMediaRuntime } from "@utils/apis"
import { getGenresWithIds, formatRate, formatRuntime, formatReleaseDate } from "@utils/utils"
import { landCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import { useUserState } from "@src/store/app-context"


export default function CommonCard({ result, media, variant }) {
  const {windowWidth} = useWindow()
  const {userState, userDispatch} = useUserState()
  const [_, setBookmarkedLS] = useLocalStorage("bookmarked", userState.bookmarked)
  const [isBookmarked, setIsBookmarked] = useState()
  const [cardWidth, setCardWidth] = useState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const cardRef = useRef(null)
  const [runtime, setRuntime] = useState(null)

  useEffect(() => {
    if (media === "movie") {
      getMediaRuntime("movie", result.id).then(d => setRuntime(d))
    }
    
    if (media === "tv") {
      getMediaRuntime("tv", result.id).then(d => setRuntime(d))
    }

    const foundIndex = userState.bookmarked.findIndex(bookm => bookm.id === result.id)
    const isFound = foundIndex !== -1
    setIsBookmarked(isFound)
  }, [])

  useEffect(() => {
    setBookmarkedLS(userState.bookmarked)
  }, [isBookmarked])

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
    }
  }, [windowWidth, cardWidth])

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

  return (
    <motion.div
      data-variant={variant}
      className="movie-card"
      ref={cardRef}
      style={{width: "clamp(175px, 55vw, 305px)"}}
      // whileFocus={{width: 1.15 * cardWidth}}
      whileHover={{width: 1.15 * cardWidth}}
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <div className="wrapper">
        <figure>
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            alt="poster"
            draggable="false"
          />
        </figure>
        <AnimatePresence>
        {cardOverlay &&
          <motion.div
            className="hover-overlay flex-col"
            variants={landCardOverlayVariants}
            {...defaultVariantsLabel}
          >
            <h4 className="title">{result.title || result.name}</h4>
            <div className="details">
              <span className="release-date">
                {formatReleaseDate(result.release_date || result.first_air_date)}
              </span>
              {media === "movie" && (
                <>
                  <i className="dot">&#x2022;</i>
                  <span className="runtime">{formatRuntime(runtime)}</span>
                </>
              )}
              <i className="dot">&#x2022;</i>
              <span className="vote">
                <span className="vote-number">{formatRate(result.vote_average)}</span>
                <i className="icon star-icon">
                  <StarIcon />
                </i>
              </span>
            </div>
            <div className="cta-btns">
              <button className="btn">
                <i className="icon play-icon">
                  <PlayIcon />
                </i>
              </button>
              <button className="btn">
                <i className="icon arrow-icon">
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
        {cardOverlay &&
          <div
            className="ambient"
            style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`}}
          />
        }
      </AnimatePresence> */}
    </motion.div>
  )
}
