import { useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { IMAGES_URL } from "@utils/apis"
import PrimaryOverlay from "./overlays/primary-overlay"
import MovieInfoModal from "@components/movie/modals/movie-info-modal"


export default function SimilarCard({ result, media, variant }) {
  const [cardOverlay, setCardOverlay] = useState(false)
  // const [showModal, setShowModal] = useState(false)


  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <div className="wrapper">
        <figure>
          <img className="poster" src={`${IMAGES_URL}w500${result.backdrop_path}`} />
        </figure>
        <AnimatePresence>
          {cardOverlay && <PrimaryOverlay result={result} variant="similar" />}
        </AnimatePresence>
      </div>
      {/* {createPortal(
        <AnimatePresence>
          {showModal && <MovieInfoModal result={result} setModal={setShowModal} /> }
        </AnimatePresence>,
        document.body
      )} */}
    </motion.div>
  )
}
