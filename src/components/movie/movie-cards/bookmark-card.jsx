import { useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import { useMediaDetails } from "@utils/hooks"
import { IMAGES_URL } from "@utils/apis"
import { useUserState } from "@src/store/app-context"
import { PortraitCardLoading } from "@components/skeletons"
import ConfirmModal from "@components/library/confirm-modal"
import SecondaryOverlay from "./overlays/secondary-overlay"


export default function BookmarkedCard({ result, media, variant }) {
  /* result-> id: number */
  const {mediaDetails, isLoading} = useMediaDetails(media, result)
  const {userDispatch} = useUserState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [scope, animate] = useAnimate()
  const confirmText = "Are you sure you want to remove this movie from your watchlist?"

  // runtime & release date for tv shows?

  if (media === "movie") {
    /* `var` used to let (pun!) variables to be accessible outside of `if` scope. */
    var {
      id,
      title,
      poster_path,
    } = mediaDetails
  } else if (media === "tv") {
    var {
      id,
      name: title,
      poster_path,
    } = mediaDetails
  }

  function handleSubmittedAction() {
    userDispatch({ type: "remove_bookmark", media, id })
    setShowModal(false)
  }

  function handleHoverStart() {
    setCardOverlay(true)
    animate(".title", { y: -45, opacity: 0 }, { duration: 0.2 })
  }

  function handleHoverEnd() {
    setCardOverlay(false)
    animate(".title", { y: 0, opacity: 1 }, { duration: 0.2 })
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
        <AnimatePresence>
          {cardOverlay && (
            <SecondaryOverlay
              result={mediaDetails}
              variant="bookmarked"
              media={media}
              setModal={setShowModal}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <div className="title-container">
        <h5 className="title truncate">{title}</h5>
      </div>
      {createPortal(
        <AnimatePresence>
          {showModal && (
            <ConfirmModal
              confirmText={confirmText}
              setModal={setShowModal}
              handleSubmittedAction={handleSubmittedAction}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
