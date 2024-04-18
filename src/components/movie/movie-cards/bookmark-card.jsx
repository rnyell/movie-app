import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, FilmIcon, TvIcon, ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { BookmarkSlashIcon, PlayIcon } from "@heroicons/solid"

import { getMovieDetails } from "@src/utils/apis"
import { getGenresBaseOnIds, formatRate, formatRuntime, formatReleaseDate } from "@src/utils/utils"


export default function BookmarkedCard({ result, type, variant, clearBookmark }) {
  const [movieDetails, setMovieDetails] = useState({})
  const [cardOverlay, setCardOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function loadMovieDetails() {
    const data = await getMovieDetails(result)
    setMovieDetails(data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadMovieDetails()
  }, [])

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
    <motion.div className="movie-card" data-variant={variant}>
      <motion.figure
        onHoverStart={() => setCardOverlay(true)}
        onHoverEnd={() => setCardOverlay(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt="poster" className="poster"
          draggable="false"
        />
      <div className="ambient" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})`}} />
      <AnimatePresence>
        {cardOverlay &&
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