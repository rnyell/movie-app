import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon } from "@heroicons/outline"
import { BookmarkSlashIcon, PlayIcon } from "@heroicons/solid"

import { useWindow, useLocalStorage } from "@src/utils/hooks"
import { getMovieDetails, getMediaRuntime } from "@src/utils/apis"
import { getGenresBaseOnIds, formatRate, formatRuntime, formatReleaseDate } from "@src/utils/utils"


export default function PlayedCard({ result, type, variant }) {
  const [cardOverlay, setCardOverlay] = useState(false)
  const [movieDetails, setMovieDetails] = useState({})
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
    runtime,
    backdrop_path,
  } = movieDetails


  return (
    <motion.div
      data-variant={variant}
      className="movie-card"
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          className="poster"
          draggable="false"
        />
      <div className="bar" />
      <AnimatePresence>
        {cardOverlay && 
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