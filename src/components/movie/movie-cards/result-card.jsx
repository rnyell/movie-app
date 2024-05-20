import { useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import { FilmIcon, TvIcon } from "@heroicons/outline"
import { InfoIcon } from "@utils/icons"
import { formatReleaseDate } from "@utils/utils"
import { portraitCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import BookmarkButton from "@components/buttons/bookmark-btn"
import Overview from "@components/movie/details/overview"
import MovieInfoModal from "@components/movie/modals/movie-info-modal"


export default function ResultCard({ result, media, variant }) {
  const [cardOverlay, setCardOverlay] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [scope, animate] = useAnimate()
  const id = result.id
  const title = result.title || result.name
  const releaseDate = result?.release_date || result?.first_air_date
  const is2024 = releaseDate === 2024 ? true : false

  // const {
  //   id,
  //   title,
  //   release_date,
  //   runtime,
  //   vote_average,
  //   poster_path,
  //   overview
  // } = result

  function handleHoverStart() {
    setCardOverlay(true)
    animate(".title", { y: -45, opacity: 0 }, { duration: 0.2 })
    animate(".release-date", { y: -30, opacity: 0 }, { duration: 0.25 })
    animate(".media-icon", { y: -5, opacity: 0 }, { duration: 0.2 })
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
      ref={scope}
      layout
      initial={{opacity: 0.5}}
      animate={{opacity: 1}}
      transition={{duration: 0.2}}
    >
      <motion.div
        className="subset-details"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <i className="icon media-icon">
          {media === "movie" ? <FilmIcon /> : <TvIcon />}
        </i>
        <figure>
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
            draggable={false}
            alt="poster"
          />
        </figure>
        <AnimatePresence>
          {cardOverlay &&
            <motion.div
              className="hover-overlay flex-col"
              variants={portraitCardOverlayVariants}
              {...defaultVariantsLabel}
            >
              <motion.h4
                className="overlay-title box-clamp"
                initial={{y: -7}}
                animate={{y: 0}}
                exit={{y: -7}}
              >{title}</motion.h4>
              <Overview text={result.overview} />
              <motion.div
                className="cta-btns justify-center absolute-align-center"
                initial={{y: 12}}
                animate={{y: 0}}
                exit={{y: 12}}
              >
                <BookmarkButton item={{id, media}} color="dark" />
                <button className="main-btn info-btn" onClick={() => setShowModal(true)}>
                  <i className="icon"><InfoIcon /></i>
                </button>
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
      <div className="main-details">
        <h4 className="title truncate">{title}</h4>
        <p className="release-date">{formatReleaseDate(releaseDate)}</p>
      </div>
      {createPortal(
        <AnimatePresence>
          {showModal && (
            <MovieInfoModal
              result={result}
              media={media}
              setModal={setShowModal}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  )
}
