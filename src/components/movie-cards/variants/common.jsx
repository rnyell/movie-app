import { useEffect, useRef, useState } from "react"
import { motion, useAnimate } from "framer-motion"
import { useWindowOffsets, useClickOutside } from "@lib/hooks"
import { IMAGES_URL } from "@services"
import { XMarkIcon } from "@heroicons/outline"
import { EllipsisIcon } from "@src/lib/ui/icons"
import { Presence } from "@src/lib/motion"
import { Button } from "@src/lib/ui/components"
import PrimaryOverlay from "../overlays/primary-overlay"


export default function CommonCard({ result, media, variant }) {
  const {windowWidth} = useWindowOffsets()
  const [cardRef, animate] = useAnimate()
  const [cardWidth, setCardWidth] = useState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const wrapperRef = useRef(null)
  const title = result.title || result.name
  const isTouchDevice = windowWidth <= 520
  const isGenrePage = location.pathname.startsWith("/discover/movies/") || location.pathname.startsWith("/discover/series/")
  const isScalable = !isTouchDevice && !isGenrePage

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
      style={{width: "clamp(215px, 55vw, 300px)"}}
      whileHover={isScalable && {width: 1.15 * cardWidth}}
      onHoverStart={() => !isTouchDevice && setCardOverlay(true)}
      onHoverEnd={() => !isTouchDevice && setCardOverlay(false)}
    >
      <div className="wrapper" ref={wrapperRef}>
        {(isTouchDevice && cardOverlay) && (
          <Button
            variants="solid-blured"
            size="square-xs"
            customStyles="absolute top-3 right-3 z-50 rounded-lg"
            iconOnly
            iconSize="md"
            svg={<XMarkIcon />}
            iconCustomStyles="stroke-3"
            onClick={hideOverlay}
          />
        )}
        <figure>
          <img
            className="poster"
            src={`${IMAGES_URL}original${result.backdrop_path}`}
            draggable={false}
          />
        </figure>
        <Presence trigger={cardOverlay}>
          <PrimaryOverlay result={result} media={media} variant="common" />
        </Presence>
        {isTouchDevice && (
          <div className="active-on-mobile align-center w-100">
            <h4 className="title truncate">{title}</h4>
            <Button
              variants="solid-blured"
              size="square-xs"
              customStyles="absolute top-3 right-3 z-50 rounded-lg"
              iconOnly
              iconSize="md"
              svg={<EllipsisIcon />}
              iconCustomStyles="stroke-3"
              onClick={showOverlay}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
