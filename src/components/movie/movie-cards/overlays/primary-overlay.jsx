import { motion } from "framer-motion"
import { useMediaDetails } from "@services/hooks"
import { formatRuntime, formatReleaseDate } from "@services/movie-utils"
import { landCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import WatchButton from "@components/buttons/watch-btn"
import LinkButton from "@components/buttons/link-btn"
import BookmarkButton from "@components/buttons/bookmark-btn"
import Rates from "@components/movie/details/rates"
import Genres from "@components/movie/details/genres"


export default function PrimaryOverlay({ result, media, variant }) {
  const id = result.id
  const isCommon = variant === "common"
  const prevUrl = location.pathname + location.search
  const linkData = { id, media, blank: !isCommon }
  const {isLoading, mediaDetails} = useMediaDetails(media, id)


  switch (media) {
    case "movie": {
      const {
        title,
        release_date,
        runtime,
        vote_average
      } = mediaDetails

      return (
        <motion.div
          className="primary-overlay primary-movie-overlay flex-col"
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
            className="overlay-details align-center"
            initial={{y: -5}}
            animate={{y: 0}}
            exit={{y: -5}}
          >
            <span className="overlay-release-date">{formatReleaseDate(release_date)}</span>
            {isCommon && (
              <>
                <i className="overlay-dot">&#x2022;</i>
                <span className="overlay-runtime">{formatRuntime(runtime)}</span>
              </>
            )}
            <i className="overlay-dot">&#x2022;</i>
            <Rates rate={vote_average} variant="star" />
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
    case "tv": {
      const {
        name,
        first_air_date,
        last_air_date,
        in_production,
        number_of_seasons,
        vote_average,
        // genres
      } = mediaDetails


      return (
        <motion.div
          className="primary-overlay primary-series-overlay flex-col"
          variants={landCardOverlayVariants}
          {...defaultVariantsLabel}
        >
          <div className="overlay-title-wrapper flex">
            <motion.h4
              className="overlay-title"
              initial={{y: -5}}
              animate={{y: 0}}
              exit={{y: -5}}
            >
              {name}
            </motion.h4>
            <Rates rate={vote_average} variant="star" />
          </div>
          <motion.div
            className="overlay-details align-center flex-wrap"
            initial={{y: -5}}
            animate={{y: 0}}
            exit={{y: -5}}
          >
            <span className="overlay-release-date">
              {in_production ? formatReleaseDate(first_air_date) : `${formatReleaseDate(first_air_date)} - ${formatReleaseDate(last_air_date)}`}
            </span>
            <i className="overlay-dot">&#x2022;</i>
            <span>{number_of_seasons} {number_of_seasons > 1 ? "Seasons" : "Seasons"}</span>
            {/* <i className="overlay-dot">&#x2022;</i>
            <Genres media={media} genres={genres} /> */}
          </motion.div>
          <motion.div
            className="overlay-cta-btns"
            initial={{y: 12}}
            animate={{y: 0}}
            exit={{y: 12}}
          >
            {<WatchButton data={{id, media, prevUrl}} />}
            <LinkButton linkData={linkData} />
            <BookmarkButton item={{id, media}} />
          </motion.div>
        </motion.div>
      )
    }
  }
}
