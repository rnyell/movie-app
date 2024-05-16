import { useState } from "react"
import { motion, AnimatePresence, useAnimate } from "framer-motion"
import { StarIcon, FilmIcon, TvIcon } from "@heroicons/outline"
import { formatRate, formatRuntime, formatReleaseDate } from "@utils/utils"
import { portraitCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import LinkButton from "@components/buttons/link-btn"
import BookmarkButton from "@components/buttons/bookmark-btn"


export default function ResultCard({ result, media, variant }) {
  const [cardOverlay, setCardOverlay] = useState(false)
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
    animate(".title", { y: -45 }, { duration: 0.2 })
    animate(".release-date", { y: -30, opacity: 0 }, { duration: 0.25 })
    animate(".media-icon", { y: -5, opacity: 0 }, { duration: 0.2 })
    animate(".vote", { y: 0, opacity: 1 }, { duration: 0.2 })
  }
  
  function handleHoverEnd() {
    setCardOverlay(false)
    animate(".title", { y: 0 }, { duration: 0.2 })
    animate(".release-date", { y: 0, opacity: 1 }, { duration: 0.25 })
    animate(".media-icon", { y: 0, opacity: 1 }, { duration: 0.2 })
    animate(".vote", { y: -8, opacity: 0 }, { duration: 0.2 })
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
        <span className="vote">
          <i className="icon star-icon"><StarIcon /></i>
          <span className="vote-number">{formatRate(result.vote_average)}</span>
        </span>
        <figure>
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
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
              <motion.div
                className="cta-btns"
                initial={{y: 12}}
                animate={{y: 0}}
                exit={{y: 12}}
              >
                <LinkButton linkData={{id, title, media}} />
                <BookmarkButton item={{id, media}} color="dark" />
              </motion.div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
      <div className="main-details">
        <h4 className="title truncate">{title}</h4>
        <p className="release-date">{formatReleaseDate(releaseDate)}</p>
      </div>
    </motion.div>
  )
}
