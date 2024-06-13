import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import { XMarkIcon } from "@heroicons/outline"
import { EllipsisIcon } from "@utils/icons"
import { IMAGES_URL } from "@services"
import { useWindowOffsets, useClickOutside } from "@utils/hooks"
import Rates from "@components/movie/details/rates"
import SeriesOverlay from "./overlays/series-overlay"


export default function SeriesCard({ result, variant }) {
  const {windowWidth} = useWindowOffsets()
  const cardRef = useRef(null)
  const [cardOverlay, setCardOverlay] = useState()
  const isTouchDevice = windowWidth <= 520

  useClickOutside(cardRef, hideOverlay)

  function hideOverlay() {
    setCardOverlay(false)
  }


  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      ref={cardRef}
      whileHover={!isTouchDevice && {scale: 1.05, cursor: "pointer"}}
      transition={{type: "tween", duration: 0.175}}
      onHoverStart={() => !isTouchDevice && setCardOverlay(true)}
      onHoverEnd={() => !isTouchDevice && setCardOverlay(false)}
    >
      <div className="card-img">
        <figure>
          <img
            className="poster"
            src={`${IMAGES_URL}original${result.backdrop_path}`}
            draggable={false}
            alt="poster"
          />
        </figure>
        <AnimatePresence>
          {cardOverlay && <SeriesOverlay result={result} />}
        </AnimatePresence>
      </div>
      <div className="card-body">
        <div className={`details align-center ${isTouchDevice ? "is-mobile" : ""}`}>
          <h4 className="title truncate">{result.name}</h4>
          {isTouchDevice ? (
            <button className="btn ellipsis-btn" type="button" onClick={() => setCardOverlay(!cardOverlay)}>
              <i className="icon">
                {/* {!cardOverlay ? <EllipsisIcon /> : <XMarkIcon />} //? doesn't work */}
                <EllipsisIcon />
              </i>
            </button>
          ) : (
            <Rates rate={result.vote_average} variant="star" />
          )}
        </div>
      </div>
    </motion.div>
  )
}
