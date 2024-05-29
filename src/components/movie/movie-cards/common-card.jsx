import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import { XMarkIcon } from "@heroicons/outline"
import { EllipsisIcon } from "@utils/icons"
import { useWindowOffsets, useClickOutside } from "@utils/hooks"
import { IMAGES_URL } from "@services"
import PrimaryOverlay from "./overlays/primary-overlay"


export default function CommonCard({ result, media, variant }) {
  const {windowWidth} = useWindowOffsets()
  const [cardRef, animate] = useAnimate()
  const [cardWidth, setCardWidth] = useState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const wrapperRef = useRef(null)
  const title = result.title || result.name
  const isTouchDevice = windowWidth <= 520

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
    }
  }, [windowWidth, cardWidth])
  
  useClickOutside(wrapperRef, hideOverlay)

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
      className={`movie-card ${isTouchDevice ? "is-mobile" : ""}`}
      data-variant={variant}
      ref={cardRef}
      style={{width: "clamp(175px, 55vw, 305px)"}}
      whileHover={!isTouchDevice && {width: 1.15 * cardWidth}}
      onHoverStart={() => !isTouchDevice && setCardOverlay(true)}
      onHoverEnd={() => !isTouchDevice && setCardOverlay(false)}
    >
      <div className="wrapper" ref={wrapperRef}>
        {(isTouchDevice && cardOverlay) && (
          <button className="btn close-btn" onClick={hideOverlay}>
            <i className="icon">
              <XMarkIcon />
            </i>
          </button>
        )}
        <figure>
          <img
            className="poster"
            src={`${IMAGES_URL}original${result.backdrop_path}`}
            draggable={false}
          />
        </figure>
        <AnimatePresence>
          {cardOverlay && <PrimaryOverlay result={result} media={media} variant="common" /> }
        </AnimatePresence>
        {isTouchDevice && (
          <div className="active-on-mobile align-center w-100">
            <h4 className="title truncate">{title}</h4>
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
