import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon, ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { useLocalStorage } from "@utils/hooks"
import { getGenresBaseOnIds, formatRate, formatRuntime, formatReleaseDate } from "@utils/utils"
import { portraitCardOverlayVariants, defaultMotionProps } from "@utils/motions"
import { useUserState } from "@src/store/app-context"


export default function ResultCard({ result, media, variant }) {
  const {userState, userDispatch} = useUserState()
  const [_, setBookmarkedLS] = useLocalStorage("bookmarked", userState.bookmarked)
  const [isBookmarked, setIsBookmarked] = useState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const [scope, animate] = useAnimate()
  const location = useLocation()

  useEffect(() => {
    const foundIndex = userState.bookmarked.findIndex(bookm => bookm.id === result.id)
    const isFound = foundIndex !== -1
    setIsBookmarked(isFound)
  }, [])

  useEffect(() => {
    setBookmarkedLS(userState.bookmarked)
  }, [isBookmarked])

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

  function handleHoverStart() {
    setCardOverlay(true)
    animate(".title", { y: -45 }, { duration: 0.2 })
    animate(".release-date", { y: -30, opacity: 0 }, { duration: 0.25 })
    animate(".media-icon", { y: -5, opacity: 0 }, { duration: 0.2 })
    animate(".vote", { y: 0, opacity: 1 }, { duration: 0.2 })
  }
  
  function handleHoverEnd() {
    // setCardOverlay(true)
    setCardOverlay(false)
    animate(".title", { y: 0 }, { duration: 0.2 })
    animate(".release-date", { y: 0, opacity: 1 }, { duration: 0.25 })
    animate(".media-icon", { y: 0, opacity: 1 }, { duration: 0.2 })
    animate(".vote", { y: -8, opacity: 0 }, { duration: 0.2 })
  }

  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      ref={scope}
      layout
      initial={{opacity: 0.5}}
      animate={{opacity: 1}}
      transition={{duration: 0.2}}
    >
      <motion.div
        className="subset-details"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <i className="icon media-icon">
          {media === "movie" ? <FilmIcon /> : <TvIcon />}
        </i>
        <span className="vote">
          <i className="icon star-icon"><StarIcon /></i>
          <span className="vote-number">{formatRate(result.vote_average)}</span>
        </span>
        <figure>
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
            alt="poster"
          />
        </figure>
        <AnimatePresence>
          {cardOverlay &&
            <motion.div
              className="hover-overlay flex-col"
              variants={portraitCardOverlayVariants}
              {...defaultMotionProps}
            >
              <motion.div
                className="cta-btns"
                initial={{y: 12}}
                animate={{y: 0}}
                exit={{y: 12}}
              >
                <Link
                  to={`/${(result.title || result.name)
                    .trim()
                    .toLowerCase()
                    .replaceAll(" ", "-")}`
                  }
                  state={{
                    id: result.id,
                    media: result.media_type,
                    prevUrl: location.pathname + location.search,
                  }}
                  >
                  <i className="icon arrow-icon">
                    <ArrowTopRightOnSquareIcon />
                  </i>
                </Link>
                <i
                  className={`icon bookmark-icon ${isBookmarked ? "is-bookmarked" : null}`}
                  onClick={() => bookmarkMovie(result.id)}
                >
                  <BookmarkIcon />
                </i>
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
      <div className="main-details">
        <h4 className="title truncate">{result?.title || result?.name}</h4>
        <p className="release-date">
          {formatReleaseDate(result?.release_date) || formatReleaseDate(result?.first_air_date)}
        </p>
      </div>
    </motion.div>
  )
}
  {/* <h5 className="overlay-title">{result?.title || result?.name}</h5>
      <span className="genres">
        {getGenresBaseOnIds(result.media_type, result.genre_ids)
        .map(genre => <span key={genre} className="genre">{genre}, </span>
      )}
  </span> */}
  {/* <p className="overview">{result.overview}</p> */}
  {/* TODO: if 2024, a "new" tag is attached */}