import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon, ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { BookmarkSlashIcon, PlayIcon } from "@heroicons/solid"

import { useWindow, useLocalStorage } from "@src/utils/hooks"
import { getMovieDetails, getMovieRuntime } from "@src/utils/apis"
import { getGenresBaseOnIds, formatRate, formatRuntime, formatReleaseDate } from "@src/utils/utils"
import { useUserState } from "@src/store/app-context"


export default function MovieCard({ result, type, ...rest }) {
  const {windowWidth} = useWindow()
  const {userState, userDispatch} = useUserState()
  const [, setBookmarkedLS] = useLocalStorage("bookmarked", userState.bookmarked)
  const [isBookmarked, setIsBookmarked] = useState()

  const [runtime, setRuntime] = useState(null)
  const listCardRef = useRef()
  const [listCardWidth, setListCardWidth] = useState()
  const [listCardOverlay, setListCardOverlay] = useState(false)
  const [bookCardOverlay, setBookCardOverlay] = useState(false)
  const [movieDetails, setMovieDetails] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsBookmarked(userState.bookmarked.includes(result.id))
  }, [])

  useEffect(() => {
    if (type === "screen" || type === "list") {
      getMovieRuntime(result.id).then(d => setRuntime(d))
    }

    if (type === "bookmarked" || type === "played") {
      loadMovieDetails()
    }

    if (listCardRef.current) {
      setListCardWidth(listCardRef.current.offsetWidth)
    }

  }, [windowWidth, listCardWidth])
  
  useEffect(() => {
    setBookmarkedLS(userState.bookmarked)
  }, [isBookmarked])

  async function loadMovieDetails() {
    const data = await getMovieDetails(result)
    setMovieDetails(data)
    setIsLoading(false)
  }

  function bookmarkMovie(id) {
    if (!userState.bookmarked.includes(id)) {
      userDispatch({ type: "add_bookmark", id })
      setIsBookmarked(true)
    } else if (userState.bookmarked.includes(id)) {
      userDispatch({ type: "remove_bookmark", id })
      setIsBookmarked(false)
    }
  }

  switch (type) {
    case "list": {
      return (
        <motion.div 
          data-type={type}
          className="movie-card"
          ref={listCardRef}
          style={{ width: "clamp(175px, 20vw, 305px)" }}
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
                <h4 className="title">{result.title}</h4>
                <div className="details">
                  <span className="release-date">{formatReleaseDate(result.release_date)}</span>
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

    case "screen": {
      return (
        <div data-type={type} className="movie-card">
          <figure>
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w500${result.backdrop_path}`} /* original or w500? */
              alt="poster"
              draggable="false"
            />
          </figure>
          <h5 className="title truncate">{result.title}</h5>
          <div className="details">
            <span className="runtime">{formatRuntime(runtime)}</span>
            <span className="vote">
              <i className="icon star-icon"><StarIcon /></i>
              <span className="vote-number">{formatRate(result.vote_average)}</span>
            </span>
          </div>
        </div>
      )
    }

    case "series": {
      return (
        <div data-type={type} className="movie-card">
          <figure>
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
              alt="poster"
              draggable="false"
            />
          </figure>
          <h5 className="title truncate">{result.name}</h5>
          <div className="details">
            <span className="vote">
              <i className="icon star-icon"><StarIcon /></i>
              <span className="vote-number">{formatRate(result.vote_average)}</span>
            </span>
          </div>
        </div>
      )
    }

    case "played": {
      const {
        id,
        title,
        runtime,
        backdrop_path,
      } = movieDetails

      return (
        <motion.div
          data-type={type}
          className="movie-card"
          onHoverStart={() => setListCardOverlay(true)}
          onHoverEnd={() => setListCardOverlay(false)}
        >
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
              className="poster"
              draggable="false"
            />
          <div className="bar" />
          <AnimatePresence>
            {listCardOverlay && 
              <motion.div 
                className="hover-overlay grid-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              >
                <button className="btn flex-x-center">
                  <i className="icon">
                    <PlayIcon />
                  </i>
                  Re-watch
                </button>
              </motion.div>
            }
          </AnimatePresence>
          </figure>
          <h5 className="title truncate">{title}</h5>
        </motion.div>
      )
    }

    case "bookmarked": {
      const { clearBookmark } = rest
      const {
        id,
        title,
        release_date,
        runtime,
        genres,
        vote_average,
        poster_path,
      } = movieDetails

      function hideConfirmationBox() {
        setShowModal(false)
        clearBookmark(id)
      }

      const ConfirmationBox = () => (
        <>
          <div className="bookmark-confirmation-box-backdrop" onClick={() => setShowModal(false)}></div>
          <motion.div
            className="bookmark-confirmation-box"
            initial={{ y: -50, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <p>Are you sure you want to remove this movie from your watchlist?</p>
            {/* <button>Add to watched</button> */}
            <div className="btns">
              <button className="btn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn del-btn" onClick={hideConfirmationBox}>Delete</button>
            </div>
          </motion.div>
        </>
      )
      
      return (
        <motion.div className="movie-card" data-type={type}>
          <motion.figure
            onHoverStart={() => setBookCardOverlay(true)}
            onHoverEnd={() => setBookCardOverlay(false)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt="poster" className="poster"
              draggable="false"
            />
          <div className="ambient" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})`}} />
          <AnimatePresence>
            {bookCardOverlay &&
            <motion.div
              className="hover-overlay"
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.2 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            >
              <i className="remove-icon" onClick={() => setShowModal(true)}>
                <BookmarkSlashIcon />
              </i>
              <div className="details">
                <span className="release-date">{formatReleaseDate(release_date)}</span>
                <span className="runtime">{formatRuntime(runtime)}</span>
                <span className="vote">
                  <i className="icon star-icon"><StarIcon /></i>
                  <span className="vote-number">{formatRate(vote_average)}</span>
                </span>
              </div>
            </motion.div>}
          </AnimatePresence>
          </motion.figure>
          <div className="title-container">
            <h5 className="title truncate">{title}</h5>
          </div>
          {createPortal(
            <AnimatePresence>
              {showModal && <ConfirmationBox />}
            </AnimatePresence>,
            document.body
          )}
        </motion.div>
      )
    }

    case "result": {
      return (
        <motion.div 
          className="movie-card"
          data-type={type}
          layout
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ opacity: 0.2 }}
        >
          <div className="subset-details">
            <i className="icon media-icon">
              {result.media_type === "movie" ? <FilmIcon /> : <TvIcon />}
            </i>
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                alt="poster" 
                className="poster"
              />
            </figure>
            <div className="hover-overlay">
            <i className="icon bookmark-icon">
              <BookmarkIcon />
            </i>
            <span className="genres">
              {getGenresBaseOnIds(result.media_type, result.genre_ids)
                .map(genre => <span key={genre} className="genre">{genre}</span>
              )}
            </span>
              <span className="vote">
                <i className="icon star-icon">
                  <StarIcon />
                </i>
                <span className="vote-number">{formatRate(result.vote_average)}</span>
              </span>
            </div>
          </div>
          <div className="main-details">
            <h4 className="title truncate">{result?.title || result.name}</h4>
            <p className="release-date">
              {formatReleaseDate(result?.release_date) || formatReleaseDate(result?.first_air_date)}
            </p>
          </div>
        </motion.div>
      )
    }
  }
  
}
