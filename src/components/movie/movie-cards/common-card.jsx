import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon } from "@heroicons/outline"
import { PlayIcon } from "@heroicons/solid"
import { useWindow } from "@utils/hooks"
import { getMediaRuntime } from "@utils/apis"
import { formatRate, formatRuntime, formatReleaseDate } from "@utils/utils"
import { landCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import BookmarkButton from "@components/buttons/bookmark-btn"
import LinkButton from "@components/buttons/link-btn"

/* another common card for series, cuz series contains pretty diffferent chars than movies */
export default function CommonCard({ result, media, variant }) {
  const {windowWidth} = useWindow()
  const [cardWidth, setCardWidth] = useState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const cardRef = useRef(null)
  const [runtime, setRuntime] = useState(null)

  const id = result.id
  const title = result.title || result.name
  const linkData = { title, id, media }

  useEffect(() => {
    if (media === "movie") {
      getMediaRuntime("movie", result.id).then(d => setRuntime(d))
    } else if (media === "tv") {
      getMediaRuntime("tv", result.id).then(d => setRuntime(d))
    }
  }, [])

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
    }
  }, [windowWidth, cardWidth])


  return (
    <motion.div
      data-variant={variant}
      className="movie-card"
      ref={cardRef}
      style={{width: "clamp(175px, 55vw, 305px)"}}
      // whileFocus={{width: 1.15 * cardWidth}}
      whileHover={{width: 1.15 * cardWidth}}
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <div className="wrapper">
        <figure>
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            alt="poster"
            draggable={false}
          />
        </figure>
        <AnimatePresence>
        {cardOverlay &&
          <motion.div
            className="hover-overlay flex-col"
            variants={landCardOverlayVariants}
            {...defaultVariantsLabel}
          >
            <h4 className="title">{title}</h4>
            <div className="details">
              <span className="release-date">
                {formatReleaseDate(result.release_date || result.first_air_date)}
              </span>
              {media === "movie" && (
                <>
                  <i className="dot">&#x2022;</i>
                  <span className="runtime">{formatRuntime(runtime)}</span>
                </>
              )}
              <i className="dot">&#x2022;</i>
              <span className="vote">
                <span className="vote-number">{formatRate(result.vote_average)}</span>
                <i className="icon star-icon">
                  <StarIcon />
                </i>
              </span>
            </div>
            <div className="cta-btns">
              <button className="btn play-btn">
                <i className="icon play-icon">
                  <PlayIcon />
                </i>
              </button>
              <LinkButton linkData={linkData} />
              <BookmarkButton item={{id, media}} color="dark" />
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>
      {/* <AnimatePresence>
        {cardOverlay &&
          <div
            className="ambient"
            style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`}}
          />
        }
      </AnimatePresence> */}
    </motion.div>
  )
}
