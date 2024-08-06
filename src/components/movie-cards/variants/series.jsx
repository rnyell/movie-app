import { useRef, useState } from "react"
import { XMarkIcon } from "@heroicons/outline"
import { EllipsisIcon } from "@lib/ui/icons"
import { IMAGES_URL } from "@services"
import { useWindowOffsets, useClickOutside } from "@lib/hooks"
import { Presence } from "@lib/motion"
import { Button } from "@lib/ui/components"
import { Card } from ".."
import { Title, Rates } from "@components/movie-details"
import SeriesOverlay from "../overlays/series-overlay"


export default function SeriesCard({ result, variant }) {
  const [cardOverlay, setCardOverlay] = useState()
  const cardRef = useRef(null)
  const { windowWidth } = useWindowOffsets()
  const isTouchDevice = windowWidth <= 520

  useClickOutside(cardRef, hideOverlay)

  function hideOverlay() {
    setCardOverlay(false)
  }

  return (
    <Card.Container
      variant={variant}
      ref={cardRef}
      isMotion
      whileHover={!isTouchDevice && {scale: 1.05}}
      transition={{type: "tween", duration: 0.175}}
      onHoverStart={() => !isTouchDevice && setCardOverlay(true)}
      onHoverEnd={() => !isTouchDevice && setCardOverlay(false)}
    >
      <Card.Figure src={`${IMAGES_URL}original${result.backdrop_path}`}>
        <Presence trigger={cardOverlay}>
          <SeriesOverlay result={result} />
        </Presence>
      </Card.Figure>
      <Card.Body customStyles="align-center">
        <Title title={result.name} size="md" />
        <Card.TouchWidget customStyles="ml-auto">
          <Button
            variants="solid-blured"
            size="square-xs"
            iconOnly
            iconSize="lg"
            svg={cardOverlay ? <XMarkIcon /> : <EllipsisIcon />}
            iconCustomStyles="unselectable"
            onClick={() => setCardOverlay(!cardOverlay)}
          />
        </Card.TouchWidget>
        {!isTouchDevice && (
          <Rates rate={result.vote_average} variant="star" />
        )}
      </Card.Body>
    </Card.Container>
  )
}
