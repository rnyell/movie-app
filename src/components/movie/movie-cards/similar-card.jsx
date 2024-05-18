import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formatReleaseDate } from "@utils/utils"
import { portraitCardOverlayVariants } from "@utils/motions"
import Rates from "@components/movie/rates"
import LinkButton from "@components/buttons/link-btn"


export default function SimilarCard({ result, media, variant }) {
  const [cardOverlay, setCardOverlay] = useState(false)
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average
  } = result


  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <figure>
        <img className="poster" src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
      </figure>
      <AnimatePresence>
        {cardOverlay && (
          <motion.div className="hover-overlay flex-col" variants={portraitCardOverlayVariants}>
            <h5 className="title">{title}</h5>
            <div className="helper-div flex">
              <span className="release-date">{formatReleaseDate(release_date)}</span>
              <Rates rate={vote_average} variant="square" />
            </div>
            <LinkButton linkData={{id, title, media, blank: true}} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
