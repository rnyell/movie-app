import { useState } from "react"
import { createPortal } from "react-dom"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, FilmIcon, TvIcon, ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { BookmarkSlashIcon, PlayIcon } from "@heroicons/solid"

import { useMediaDetails } from "@utils/hooks"
import { getGenresWithIds, formatRate, formatRuntime, formatReleaseDate } from "@utils/utils"
import { portraitCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import { useUserState } from "@src/store/app-context"
import { PortraitCardLoading } from "@components/skeletons"
import ConfirmModal from "@components/user-related/confirm-modal"


export default function BookmarkedCard({ result, media, variant }) {
  /* result: number */
  const {mediaDetails, isLoading} = useMediaDetails(media, result)
  const {userDispatch} = useUserState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const location = useLocation()
  const confirmText = "Are you sure you want to remove this movie from your watchlist?"

  if (media === "movie") {
    /* `var` used to let (pun!) variables to be accessible outside of `if` scope. */
    var {
      id,
      title,
      release_date,
      runtime,
      vote_average,
      poster_path,
      overview
    } = mediaDetails
  } else if (media === "tv") {
    var {
      id,
      name: title,
      runtime,
      vote_average,
      poster_path,
      overview
    } = mediaDetails
  }
  
  function handleSubmittedAction() {
    userDispatch({ type: "remove_bookmark", media, id })
    setShowModal(false)
  }


  if (isLoading) {
    return <PortraitCardLoading />
  }

  return (
    <motion.div className="movie-card" data-variant={variant}>
      <motion.figure
        onHoverStart={() => setCardOverlay(true)}
        onHoverEnd={() => setCardOverlay(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          className="poster"
          alt="poster"
          draggable="false"
        />
      <div className="ambient" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})`}} />
      <AnimatePresence>
        {cardOverlay &&
        <motion.div
          className="hover-overlay flex-col"
          variants={portraitCardOverlayVariants}
          {...defaultVariantsLabel}
        >
          <div className="details flex-col">
            <div className="flex">
              <span className="release-date">{formatReleaseDate(release_date)}</span>
              <i className="dot">&#x2022;</i>
              <span className="runtime">{formatRuntime(runtime)}</span>
              <i className="dot">&#x2022;</i>
              <span className="vote">
                <i className="icon star-icon"><StarIcon /></i>
                <span className="vote-number">{formatRate(vote_average)}</span>
              </span>
            </div>
            <p className="overview box-clamp">{overview}</p>
          </div>
          <div className="cta-btns flex-justify-center">
            <button className="btn">
              <i className="icon remove-icon" onClick={() => setShowModal(true)}>
                <BookmarkSlashIcon />
              </i>
            </button>
            <Link
              className="btn"
              to={`/${(title)
                .trim()
                .toLowerCase()
                .replaceAll(" ", "-")}`
              }
              state={{
                id: result,
                media: media,
                prevUrl: location.pathname + location.search,
              }}
            >
              <i className="icon arrow-icon">
                <ArrowTopRightOnSquareIcon />
              </i>
            </Link>
          </div>
        </motion.div>}
      </AnimatePresence>
      </motion.figure>
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
    </motion.div>
  )
}
