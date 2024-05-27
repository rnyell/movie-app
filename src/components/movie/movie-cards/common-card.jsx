import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EllipsisIcon } from "@utils/icons"
import { useWindowOffsets, useClickOutside } from "@utils/hooks"
import { IMAGES_URL, getMediaRuntime } from "@services"
import PrimaryOverlay from "./overlays/primary-overlay"

/* another common card for series, cuz series contains pretty diffferent chars than movies */
export default function CommonCard({ result, media, variant }) {
  const {windowWidth} = useWindowOffsets()
  // const initialWidth = {width: windowWidth > 620 ? "clamp(175px, 55vw, 305px)" : "clamp(175px, 55vw, 305px)" }
  const [cardWidth, setCardWidth] = useState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const cardRef = useRef(null)
  const ellipsisBtnRef = useRef(null)
  const [runtime, setRuntime] = useState(null)
  const title = result.title || result.name

  // useClickOutside(ellipsisBtnRef, hideOverlay)

  useEffect(() => {
    if (media === "movie") {
      getMediaRuntime("movie", result.id).then(d => setRuntime(d))
    } else if (media === "tv") {
      getMediaRuntime("tv", result.id).then(d => setRuntime(d))
    }
  }, [])

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
    }
  }, [windowWidth, cardWidth])

  /* showOverlay() & hideOverlay() are created for touch devices to show the overlay */
  function showOverlay(e) {
    e.stopPropagation()
    setCardOverlay(true)
    cardRef.current.style.width = `${1.15 * cardWidth}px`
  }

  function hideOverlay() {
    setCardOverlay(false)
    cardRef.current.style.width = "clamp(175px, 55vw, 305px)"
  }


  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      ref={cardRef}
      style={{width: "clamp(175px, 55vw, 305px)"}}
      whileHover={{width: 1.15 * cardWidth}}
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <div className="wrapper">
        <figure>
          <img
            className="poster"
            src={`${IMAGES_URL}original${result.backdrop_path}`}
            draggable={false}
          />
        </figure>
        <AnimatePresence>
          {cardOverlay && <PrimaryOverlay result={result} variant="common" /> }
        </AnimatePresence>
      </div>
      {windowWidth < 520 && (
        <div className="active-on-mobile align-center w-100">
          <h4 className="title">{title}</h4>
          <button
            className="btn ellipsis-btn"
            ref={ellipsisBtnRef}
            // onClick={showOverlay}
          >
            <i className="icon">
              <EllipsisIcon />
            </i>
          </button>
        </div>
      )}
    </motion.div>
  )
}
