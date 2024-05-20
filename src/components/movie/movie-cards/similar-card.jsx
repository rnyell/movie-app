import { useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { InfoIcon } from "@utils/icons"
import { formatReleaseDate } from "@utils/utils"
import { landCardOverlayVariants } from "@utils/motions"
import Rates from "@components/movie/details/rates"
import LinkButton from "@components/buttons/link-btn"
import MovieInfoModal from "@components/movie/modals/movie-info-modal"


export default function SimilarCard({ result, media, variant }) {
  const [cardOverlay, setCardOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const {
    id,
    title,
    poster_path,
    backdrop_path,
    release_date,
    vote_average
  } = result


  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <figure>
        <img className="poster" src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} />
      </figure>
      <AnimatePresence>
        {cardOverlay && (
          <motion.div className="hover-overlay flex-col" variants={landCardOverlayVariants}>
            <h5 className="title">{title}</h5>
            <div className="helper-div flex">
              <span className="release-date">{formatReleaseDate(release_date)}</span>
              <Rates rate={vote_average} variant="square" />
            </div>
            <LinkButton linkData={{id, title, media, blank: true}} />
            <button className="main-btn info-btn" onClick={() => setShowModal(true)}>
              <i className="icon"><InfoIcon /></i>
            </button>
          </motion.div>
        )}
        {createPortal(
        <AnimatePresence>
          {showModal && (
            <MovieInfoModal
              result={result}
              setModal={setShowModal}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
      </AnimatePresence>
    </motion.div>
  )
}
