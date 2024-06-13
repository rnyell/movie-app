import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { PlayIcon } from "@heroicons/solid"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"


export default function PlayedCard({ result, media, variant }) {
  const [cardOverlay, setCardOverlay] = useState(false)
  const {isLoading, mediaDetails} = useMediaDetails("movie", result)
  const prevUrl = location.pathname + location.search
  const navigate = useNavigate()

  const {
    id,
    title,
    runtime,
    backdrop_path,
  } = mediaDetails

  function handleRewatch() {
    navigate("/player", { state: { id, media, prevUrl } })
  }


  return (
    <motion.div
      data-variant={variant}
      className="movie-card"
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <figure>
        <img
          src={`${IMAGES_URL}original${backdrop_path}`}
          className="poster"
          draggable={false}
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
            <button className="btn justify-center" type="button" onClick={handleRewatch}>
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
