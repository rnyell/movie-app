import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon } from "@heroicons/outline"
import { PlayIcon } from "@heroicons/solid"
import { EllipsisIcon } from "@utils/icons"
import { useWindow, useClickOutside } from "@utils/hooks"
import { getMediaRuntime } from "@utils/apis"
import { formatRate, formatRuntime, formatReleaseDate } from "@utils/utils"
import { landCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import BookmarkButton from "@components/buttons/bookmark-btn"
import LinkButton from "@components/buttons/link-btn"

/* another common card for series, cuz series contains pretty diffferent chars than movies */
export default function CommonCard({ result, media, variant }) {
  const {windowWidth} = useWindow()
  // const initialWidth = {width: windowWidth > 620 ? "clamp(175px, 55vw, 305px)" : "clamp(175px, 55vw, 305px)" }
  const [cardWidth, setCardWidth] = useState()
  const [cardOverlay, setCardOverlay] = useState(false)
  const cardRef = useRef(null)
  const ellipsisBtnRef = useRef(null)
  const [runtime, setRuntime] = useState(null)
  const id = result.id
  const title = result.title || result.name
  const linkData = { title, id, media }

  useClickOutside(ellipsisBtnRef, hideOverlay)

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

  /* showOverlay() & hideOverlay() are created for touch devices to show the overlay */
  function showOverlay(e) {
    e.stopPropagation()
    setCardOverlay(true)
    cardRef.current.style.width = `${1.15 * cardWidth}px`
  }

  function hideOverlay() {
    setCardOverlay(false)
    cardRef.current.style.width = "clamp(175px, 55vw, 305px)"
  }


  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      ref={cardRef}
      style={{width: "clamp(175px, 55vw, 305px)"}}
      whileHover={{width: 1.15 * cardWidth}}
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <div className="wrapper">
        <figure>
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            draggable={false}
            alt="poster"
          />
        </figure>
        <AnimatePresence>
        {cardOverlay && (
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
              <button className="main-btn play-btn">
                <i className="icon play-icon">
                  <PlayIcon />
                </i>
              </button>
              <LinkButton linkData={linkData} />
              <BookmarkButton item={{id, media}} color="dark" />
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
      {windowWidth < 520 && (
        <div className="active-on-mobile align-center w-100">
          <h4 className="title">{title}</h4>
          <button
            className="btn ellipsis-btn"
            ref={ellipsisBtnRef}
            onClick={showOverlay}
          >
            <i className="icon">
              <EllipsisIcon />
            </i>
          </button>
        </div>
      )}
    </motion.div>
  )
}

{/* <AnimatePresence>
  {cardOverlay &&
    <div
      className="ambient"
      style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${result.backdrop_path})`}}
    />
  }
</AnimatePresence> */}