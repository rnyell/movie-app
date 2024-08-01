import { useState } from "react"
import { motion, useAnimate } from "framer-motion"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { useAppContext } from "@src/store"
import Presence from "@src/lib/motion/presence"
import { PortraitCardLoading } from "@components/skeletons"
import ConfirmModal from "@components/modals/confirm-modal"
import SecondaryOverlay from "../overlays/secondary-overlay"


export default function BookmarkedCard({ id, media, variant }) {
  const { modalDispatch } = useAppContext()
  const {mediaDetails, isLoading} = useMediaDetails(media, id)
  const [cardOverlay, setCardOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [scope, animate] = useAnimate()

  // runtime & release date for tv shows?

  if (media === "movie") {
    // `var` used to let (pun!) variables to be accessible outside of `if` scope.
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

  function handleHoverStart() {
    setCardOverlay(true)
    animate(".title", { y: -45, opacity: 0 }, { duration: 0.2 })
  }

  function handleHoverEnd() {
    setCardOverlay(false)
    animate(".title", { y: 0, opacity: 1 }, { duration: 0.2 })
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
    <div className="movie-card" data-variant={variant} ref={scope}>
      <motion.div
        className="wrapper"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <figure>
          <img
            src={`${IMAGES_URL}original${poster_path}`}
            className="poster"
            draggable={false}
            alt="poster"
          />
        </figure>
        <div className="ambient" style={{backgroundImage: `url(${IMAGES_URL}original${poster_path})`}} />
        <Presence trigger={cardOverlay}>
          <SecondaryOverlay
            result={mediaDetails}
            variant="bookmarked"
            media={media}
            setModal={setShowModal}
          />
        </Presence>
      </motion.div>
      <div className="title-container">
        <h5 className="title truncate">{title}</h5>
      </div>
    </div>
  )
}
