import { useState } from "react"
import { motion, useAnimate } from "framer-motion"
import { useAppContext } from "@src/store"
import Presence from "@src/lib/motion/presence"
import { IMAGES_URL } from "@services"
import { formatReleaseDate } from "@services/movie-utils"
import { useWindowOffsets, useClickOutside } from "@lib/hooks"
import { FilmIcon, TvIcon, XMarkIcon } from "@heroicons/outline"
import { EllipsisIcon } from "@src/lib/ui/icons"
import { Button, Icon } from "@src/lib/ui/components"
import SecondaryOverlay from "../overlays/secondary-overlay"


export default function ResultCard({ result, media, variant }) {
  const { modalDispatch } = useAppContext()
  const {windowWidth} = useWindowOffsets()
  const [cardRef, animate] = useAnimate()
  const [cardOverlay, setCardOverlay] = useState(false)
  const title = result.title || result.name
  const releaseDate = result?.release_date || result?.first_air_date
  const is2024 = releaseDate === 2024 ? true : false
  const isTouchDevice = windowWidth <= 520

  useClickOutside(cardRef, handleHoverEnd)

  function showInfoModal() {
    modalDispatch({
      type: "movie_info",
      data: { result, media }
    })
  }

  function handleHoverStart() {
    setCardOverlay(true)
    animate(".title", { y: -45, opacity: 0 }, { duration: 0.2 })
    animate(".release-date", { y: -30, opacity: 0 }, { duration: 0.25 })
    animate(".media-icon", { y: -25, opacity: 0 }, { duration: 0.2 })
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
      ref={cardRef}
      layout
      initial={{opacity: 0.5}}
      animate={{opacity: 1}}
      transition={{duration: 0.2}}
    >
      <motion.div
        className="wrapper"
        onHoverStart={!isTouchDevice && handleHoverStart}
        onHoverEnd={!isTouchDevice && handleHoverEnd}
      >
        {isTouchDevice && (
          <Button
            variants="solid-blured"
            size="square-sm"
            customStyles={`${cardOverlay ? "opacity-0" : ""} absolute top-3 right-3 z-50`}
            iconOnly
            iconSize="lg"
            svg={<EllipsisIcon />}
            iconCustomStyles="unselectable"
            onClick={cardOverlay ? handleHoverEnd : handleHoverStart}
            // svg={cardOverlay ? <XMarkIcon /> : <EllipsisIcon />}
            // {/* why onClick doesn't work without `unselectable` on icon !? */}
          />
        )}
        <figure>
          <img
            className="poster"
            src={`${IMAGES_URL}w500${result.poster_path}`}
            draggable={false}
            alt="poster"
          />
        </figure>
        <Presence trigger={cardOverlay}>
          <SecondaryOverlay
            result={result}
            variant="result"
            media={media}
            setModal={showInfoModal}
          />
        </Presence>
      </motion.div>
      <div className="main-details flex-col">
        <h5 className="title truncate">{title}</h5>
        <div className="align-center w-100">
          <p className="release-date">{formatReleaseDate(releaseDate)}</p>
          <Icon
            size="lg"
            svg={media === "movie" ? <FilmIcon /> : <TvIcon />}
            customStyles="ml-auto stroke-3 media-icon"
          />
        </div>
      </div>
    </motion.div>
  )
}
