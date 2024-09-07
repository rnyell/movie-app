import { useState } from "react"
import { useAnimate } from "framer-motion"
import { useAppContext } from "@src/store"
import { IMAGES_URL } from "@services"
import { formatReleaseDate } from "@services/movie-utils"
import { useWindowOffsets, useClickOutside } from "@lib/hooks"
import { FilmIcon, TvIcon, XMarkIcon } from "@heroicons/outline"
import { EllipsisIcon } from "@lib/ui/icons"
import { Presence } from "@lib/motion"
import { Button, Icon } from "@lib/ui/components"
import { Card } from ".."
import { Title } from "@components/movie-details"
import SecondaryOverlay from "../overlays/secondary-overlay"


export default function ResultCard({ result, media, variant }) {
  const { modalDispatch } = useAppContext()
  const { windowWidth } = useWindowOffsets()
  const isTouchDevice = windowWidth <= 520

  const [cardRef, animate] = useAnimate()
  const [cardOverlay, setCardOverlay] = useState(false)
  const title = result.title || result.name
  const releaseDate = result?.release_date || result?.first_air_date
  const is2024 = releaseDate === 2024 ? true : false

  useClickOutside(cardRef, handleHoverEnd)

  function showInfoModal() {
    modalDispatch({
      type: "movie_info",
      data: { result, media }
    })
  }

  function handleHoverStart() {
    setCardOverlay(true)
    animate(".release-date", { y: -30, opacity: 0 }, { duration: 0.25 })
    animate(".media-icon", { y: -25, opacity: 0 }, { duration: 0.2 })
  }

  function handleHoverEnd() {
    setCardOverlay(false)
    animate(".release-date", { y: 0, opacity: 1 }, { duration: 0.25 })
    animate(".media-icon", { y: 0, opacity: 1 }, { duration: 0.2 })
  }

  return (
    <Card.Container
      variant={variant}
      ref={cardRef}
      isMotion
      layout="position"
      initial={{opacity: 0.5}}
      animate={{opacity: 1}}
      transition={{duration: 0.2}}
    >
      <Card.Figure
        isMotion
        src={`${IMAGES_URL}w500${result.poster_path}`}
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
        <Presence trigger={cardOverlay}>
          <SecondaryOverlay
            result={result}
            media={media}
            variant="result"
            setModal={showInfoModal}
          />
        </Presence>
      </Card.Figure>
      <Card.Body customStyles="flex-col gap-1">
        <Title
          title={title}
          size="lg"
          width="95%"
          isMotion
          animate={cardOverlay ? { y: -45, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <div className="align-center w-full">
          <p className="release-date">{formatReleaseDate(releaseDate)}</p>
          <Icon
            size="lg"
            svg={media === "movie" ? <FilmIcon /> : <TvIcon />}
            customStyles="ml-auto stroke-3 media-icon"
          />
        </div>
      </Card.Body>
    </Card.Container>
  )
}
