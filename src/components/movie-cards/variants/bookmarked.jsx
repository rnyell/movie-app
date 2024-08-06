import { useState } from "react"
import { useAnimate } from "framer-motion"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { useAppContext } from "@src/store"
import { useClickOutside, useWindowOffsets } from "@lib/hooks"
import { EllipsisIcon } from "@lib/ui/icons"
import { XMarkIcon } from "@heroicons/outline"
import { PortraitCardLoading } from "@components/skeletons"
import { Presence } from "@lib/motion"
import { Button } from "@lib/ui/components"
import { Card } from ".."
import { Title } from "@components/movie-details"
import SecondaryOverlay from "../overlays/secondary-overlay"

// runtime & release date for tv shows?

export default function BookmarkedCard({ id, media, variant }) {
  const { modalDispatch } = useAppContext()
  const [cardOverlay, setCardOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [cardRef, animate] = useAnimate()

  const { windowWidth } = useWindowOffsets()
  const isTouchDevice = windowWidth <= 520

  useClickOutside(cardRef, hideOverlay)

  const { mediaDetails, isLoading } = useMediaDetails(media, id)

  if (media === "movie") {
    // `var` used to let (pun!) variables to be accessible outside of `if` cardRef.
    var {
      title,
      poster_path,
    } = mediaDetails
  } else if (media === "tv") {
    var {
      name: title,
      poster_path,
    } = mediaDetails
  }

  function showOverlay() {
    setCardOverlay(true)
    // animate(".title", { y: -45, opacity: 0 }, { duration: 0.2 })
  }

  function hideOverlay() {
    setCardOverlay(false)
    // animate(".title", { y: 0, opacity: 1 }, { duration: 0.2 })
  }

  function d() {
    modalDispatch({
      type: "confirm",
      data: {
        msg: "Are you sure you want to remove this movie from your watchlist?"
      }
    })
  }


  if (isLoading) {
    return <PortraitCardLoading />
  }

  return (
    <Card.Container variant={variant} ref={cardRef}>
      <Card.Figure
        src={`${IMAGES_URL}original${poster_path}`}
        isMotion
        onHoverStart={!isTouchDevice && showOverlay}
        onHoverEnd={!isTouchDevice && hideOverlay}
      >
      <Presence trigger={cardOverlay}>
        <SecondaryOverlay
          result={mediaDetails}
          media={media}
          card="bookmarked"
          setModal={setShowModal}
        />
      </Presence>
      <div className="ambient" style={{backgroundImage: `url(${IMAGES_URL}original${poster_path})`}} />
      </Card.Figure>
      <Card.Body customStyles="align-center gap-1">
        <Title title={title} width="90%" />
        <Card.TouchWidget customStyles="ml-auto">
          <Button
            variants="solid-blured"
            size="square-xs"
            customStyles="rounded-lg"
            iconOnly
            iconSize="md"
            svg={cardOverlay ? <XMarkIcon /> : <EllipsisIcon />}
            iconCustomStyles="stroke-3 unselectable"
            onClick={() => setCardOverlay(!cardOverlay)}
          />
        </Card.TouchWidget>
      </Card.Body>
    </Card.Container>
  )
}
