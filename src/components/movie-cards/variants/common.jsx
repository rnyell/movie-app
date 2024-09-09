import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAnimate } from "framer-motion"
import { IMAGES_URL } from "@services"
import { Presence } from "@lib/motion"
import { useWindowOffsets, useClickOutside } from "@lib/hooks"
import { XMarkIcon } from "@heroicons/outline"
import { EllipsisIcon } from "@lib/ui/icons"
import { Button } from "@lib/ui/components"
import { Title } from "@components/movie-details"
import { Card } from ".."
import PrimaryOverlay from "../overlays/primary-overlay"

export default function CommonCard({ result, media, variant }) {
  const title = result.title || result.name
  const [cardRef, animate] = useAnimate()
  const [cardWidth, setCardWidth] = useState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const widgetRef = useRef(null)

  const { windowWidth } = useWindowOffsets()
  const { pathname } = useLocation()
  const isTouchDevice = windowWidth <= 520
  const isGenrePage = pathname === "/discover/genres"
  const isScalable = !isTouchDevice && !isGenrePage

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
    }
  }, [windowWidth, cardWidth])

  useClickOutside(cardRef, hideOverlay)

  function showOverlay() {
    setCardOverlay(true)

    if (isTouchDevice) {
      animate(widgetRef.current, { opacity: 0, y: 13 }, { duration: 0.2 })
    }
  }

  function hideOverlay() {
    setCardOverlay(false)

    if (isTouchDevice) {
      animate(widgetRef.current, { opacity: 1, y: 0 }, { duration: 0.25 })
    }
  }

  return (
    <Card.Container
      isMotion
      data-variant={variant}
      ref={cardRef}
      style={{ width: "clamp(245px, 65vw, 300px)" }}
      whileHover={isScalable && { width: 1.15 * cardWidth }}
      onHoverStart={() => !isTouchDevice && setCardOverlay(true)}
      onHoverEnd={() => !isTouchDevice && setCardOverlay(false)}
    >
      {isTouchDevice && cardOverlay && (
        <Button
          variant="solid-blured"
          size="xs"
          className="absolute top-3 right-3 z-50 rounded-lg"
          isSquare
          iconOnly
          iconSize="md"
          svg={<XMarkIcon />}
          iconClassname="stroke-3"
          onClick={hideOverlay}
        />
      )}
      <Card.Figure src={`${IMAGES_URL}original${result.backdrop_path}`}>
        <Presence trigger={cardOverlay}>
          <PrimaryOverlay result={result} media={media} />
        </Presence>
      </Card.Figure>
      <Card.Body customStyles="absolute bottom-0 z-10 w-full">
        <Card.TouchWidget ref={widgetRef} customStyles="align-center">
          <Title title={title} width="85%" />
          <Button
            variant="solid-blured"
            size="xs"
            className="ml-auto rounded-lg"
            isSquare
            iconOnly
            iconSize="md"
            svg={<EllipsisIcon />}
            iconClassname="stroke-3"
            onClick={showOverlay}
          />
        </Card.TouchWidget>
      </Card.Body>
    </Card.Container>
  )
}
