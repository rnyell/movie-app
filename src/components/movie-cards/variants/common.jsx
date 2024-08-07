import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAnimate } from "framer-motion"
import { useWindowOffsets, useClickOutside } from "@lib/hooks"
import { IMAGES_URL } from "@services"
import { XMarkIcon } from "@heroicons/outline"
import { EllipsisIcon } from "@lib/ui/icons"
import { Presence } from "@lib/motion"
import { Button } from "@lib/ui/components"
import { Card } from ".."
import { Title } from "@components/movie-details"
import PrimaryOverlay from "../overlays/primary-overlay"


export default function CommonCard({ result, media, variant }) {
  const title = result.title || result.name
  const [cardRef, animate] = useAnimate()
  const [cardWidth, setCardWidth] = useState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const touchWidgetRef = useRef(null)
  
  const { windowWidth } = useWindowOffsets()
  const { pathname } = useLocation()
  const isTouchDevice = windowWidth <= 520
  const isGenrePage = pathname.startsWith("/discover/movies/") || pathname.startsWith("/discover/series/")
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
      animate(touchWidgetRef.current, { opacity: 0, y: 13 }, { duration: 0.2 })
    }
  }

  function hideOverlay() {
    setCardOverlay(false)

    if (isTouchDevice) {
      animate(touchWidgetRef.current, { opacity: 1, y: 0 }, { duration: 0.25 })
    }
  }


  return (
    <Card.Container
      isMotion
      data-variant={variant}
      ref={cardRef}
      style={{width: "clamp(235px, 55vw, 300px)"}}
      whileHover={isScalable && {width: 1.15 * cardWidth}}
      // TODO: whileHover={isScalable && {scale: 1.2, zIndex: 1000}}
      onHoverStart={() => !isTouchDevice && setCardOverlay(true)}
      onHoverEnd={() => !isTouchDevice && setCardOverlay(false)}
    >
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
      <Card.Figure src={`${IMAGES_URL}original${result.backdrop_path}`}>
        <Presence trigger={cardOverlay}>
          <PrimaryOverlay result={result} media={media} />
        </Presence>
      </Card.Figure>
      <Card.Body customStyles="absolute bottom-0 z-10 w-100%">
        <Card.TouchWidget ref={touchWidgetRef} customStyles="align-center">
          <Title title={title} width="85%" />
          <Button
            variants="solid-blured"
            size="square-xs"
            customStyles="ml-auto rounded-lg"
            iconOnly
            iconSize="md"
            svg={<EllipsisIcon />}
            iconCustomStyles="stroke-3"
            onClick={showOverlay}
          />
        </Card.TouchWidget>
      </Card.Body>
    </Card.Container>
  )
}
