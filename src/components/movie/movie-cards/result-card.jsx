import { useState } from "react"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import { FilmIcon, TvIcon } from "@heroicons/outline"
import { IMAGES_URL } from "@services"
import { formatReleaseDate } from "@services/movie-utils"
import MovieInfoModal from "@components/modals/movie-info-modal"
import SecondaryOverlay from "./overlays/secondary-overlay"


export default function ResultCard({ result, media, variant }) {
  const [cardOverlay, setCardOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [scope, animate] = useAnimate()
  const title = result.title || result.name
  const releaseDate = result?.release_date || result?.first_air_date
  const is2024 = releaseDate === 2024 ? true : false

  // const {
  //   id,
  //   title,
  //   release_date,
  //   runtime,
  //   vote_average,
  //   poster_path,
  //   overview
  // } = result

  function handleHoverStart() {
    setCardOverlay(true)
    animate(".title", { y: -45, opacity: 0 }, { duration: 0.2 })
    animate(".release-date", { y: -30, opacity: 0 }, { duration: 0.25 })
    animate(".media-icon", { y: -5, opacity: 0 }, { duration: 0.2 })
  }

  function handleHoverEnd() {
    setCardOverlay(false)
    animate(".title", { y: 0, opacity: 1 }, { duration: 0.2 })
    animate(".release-date", { y: 0, opacity: 1 }, { duration: 0.25 })
    animate(".media-icon", { y: 0, opacity: 1 }, { duration: 0.2 })
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
        className="wrapper"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <i className="icon media-icon">
          {media === "movie" ? <FilmIcon /> : <TvIcon />}
        </i>
        <figure>
          <img
            className="poster"
            src={`${IMAGES_URL}w500${result.poster_path}`}
            draggable={false}
            alt="poster"
          />
        </figure>
        <AnimatePresence>
          {cardOverlay && (
            <SecondaryOverlay
              result={result}
              variant="result"
              media={media}
              setModal={setShowModal}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <div className="main-details">
        <h4 className="title truncate">{title}</h4>
        <p className="release-date">{formatReleaseDate(releaseDate)}</p>
      </div>
      {<AnimatePresence>
        {showModal && (
          <MovieInfoModal
            result={result}
            media={media}
            setModal={setShowModal}
          />
        )}
      </AnimatePresence>}
    </motion.div>
  )
}
