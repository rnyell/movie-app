import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { PlayIcon } from "@heroicons/solid"
import { useLocalStorage } from "@utils/hooks"
import { getMovieDetails, getMediaRuntime } from "@utils/apis"
import { getGenresWithIds, formatRate, formatRuntime, formatReleaseDate } from "@utils/utils"


export default function PlayedCard({ result, media, variant }) {
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
            <button className="btn justify-center">
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
