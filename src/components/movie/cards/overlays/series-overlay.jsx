import { motion } from "framer-motion"
import { useMediaDetails } from "@services/hooks"
import { formatReleaseDate } from "@services/movie-utils"
import { landCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import LinkButton from "@components/buttons/link-btn"
import BookmarkButton from "@components/buttons/bookmark-btn"
// import Overview from "@components/movie/details/overview"
import Genres from "@components/movie/details/genres"


export default function SeriesOverlay({ result }) {
  const id = result.id
  const media = "tv"
  const linkData = { id, media, blank: false }
  const {isLoading, mediaDetails} = useMediaDetails(media, id)

  const {
    // name,
    first_air_date,
    last_air_date,
    in_production,
    number_of_seasons,
    // overview,
    vote_average,
    genres
  } = mediaDetails


  return (
    <motion.div
      className="overlay series-overlay"
      variants={landCardOverlayVariants}
      {...defaultVariantsLabel}
    >
      {/* <Overview text={overview} /> */}
      <motion.div
        className="overlay-details align-center flex-wrap"
        initial={{y: -5}}
        animate={{y: 0}}
        exit={{y: -5}}
      >
        <span className="overlay-release-date">
          {(in_production || number_of_seasons === 1) ? 
            formatReleaseDate(first_air_date) : 
            `${formatReleaseDate(first_air_date)} ‒ ${formatReleaseDate(last_air_date)}`}
        </span>
        <i className="overlay-dot">&#x2022;</i>
        <span>{number_of_seasons} {number_of_seasons > 1 ? "Seasons" : "Season"}</span>
      </motion.div>
      <motion.div
        initial={{y: -6.5}}
        animate={{y: 0}}
        exit={{y: -6.5}}
      >
        <Genres media={media} genres={genres} />
      </motion.div>
      <motion.div
        className="overlay-cta-btns flex"
        initial={{y: 12}}
        animate={{y: 0}}
        exit={{y: 12}}
      >
        <LinkButton linkData={linkData} />
        <BookmarkButton item={{id, media}} />
      </motion.div>
    </motion.div>
  )
}
