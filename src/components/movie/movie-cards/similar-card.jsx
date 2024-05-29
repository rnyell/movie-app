import { useState } from "react"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import { EllipsisIcon } from "@utils/icons"
import { IMAGES_URL } from "@services"
import { useWindowOffsets, useClickOutside } from "@utils/hooks"
import PrimaryOverlay from "./overlays/primary-overlay"


export default function SimilarCard({ result, media, variant }) {
  const {windowWidth} = useWindowOffsets()
  const [cardRef, animate] = useAnimate()
  const [cardOverlay, setCardOverlay] = useState(false)
  const isTouchDevice = windowWidth <= 520

  /* showOverlay() & hideOverlay() are created for touch devices to hide/show the overlay */
  function showOverlay() {
    setCardOverlay(true)
    animate(".active-on-mobile", { opacity: 0, y: 13 }, { duration: 0.2 })
  }

  function hideOverlay() {
    setCardOverlay(false)
    animate(".active-on-mobile", { opacity: 1, y: 0 }, { duration: 0.25 })
  }


  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      ref={cardRef}
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <div className="wrapper">
        <figure>
          <img className="poster" src={`${IMAGES_URL}w500${result.backdrop_path}`} />
        </figure>
        <AnimatePresence>
          {cardOverlay && <PrimaryOverlay result={result} media={media} variant="similar" />}
        </AnimatePresence>
        {isTouchDevice && (
          <div className="active-on-mobile align-center w-100">
            <h4 className="title truncate">{result.title}</h4>
            <button className="btn ellipsis-btn" onClick={showOverlay}>
              <i className="icon">
                <EllipsisIcon />
              </i>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
