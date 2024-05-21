import { motion } from "framer-motion"
import { formatRuntime, formatReleaseDate } from "@utils/utils"
import { landCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import WatchButton from "@components/buttons/watch-btn"
import LinkButton from "@components/buttons/link-btn"
import BookmarkButton from "@components/buttons/bookmark-btn"
import Rates from "@components/movie/details/rates"


export default function PrimaryOverlay({ result, variant }) {
  const id = result.id
  const title = result.title
  const media = "movie"
  const isCommon = variant === "common"
  const prevUrl = location.pathname + location.search
  const linkData = { id, blank: !isCommon }

  return (
    <motion.div
      className="primary-overlay flex-col"
      variants={landCardOverlayVariants}
      {...defaultVariantsLabel}
    >
      <motion.h4
        className="overlay-title"
        initial={{y: -5}}
        animate={{y: 0}}
        exit={{y: -5}}
      >
        {title}
      </motion.h4>
      <motion.div
        className="overlay-details"
        initial={{y: -5}}
        animate={{y: 0}}
        exit={{y: -5}}
      >
        <span className="overlay-release-date">{formatReleaseDate(result.release_date)}</span>
        {isCommon && (
          <>
            <i className="overlay-dot">&#x2022;</i>
            <span className="overlay-runtime">{formatRuntime(result.runtime)}</span>
          </>
        )}
        <i className="overlay-dot">&#x2022;</i>
        <Rates rate={result.vote_average} variant="star" />
      </motion.div>
      <motion.div
        className="overlay-cta-btns"
        initial={{y: 12}}
        animate={{y: 0}}
        exit={{y: 12}}
      >
        {isCommon && <WatchButton data={{id, media, prevUrl}} />}
        <LinkButton linkData={linkData} />
        <BookmarkButton item={{id, media}} />
      </motion.div>
    </motion.div>
  )
}
