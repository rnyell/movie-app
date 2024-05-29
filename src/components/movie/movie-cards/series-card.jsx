import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, BookmarkIcon } from "@heroicons/outline"
import { IMAGES_URL } from "@services"
import { formatRate } from "@services/movie-utils"
import Rates from "@components/movie/details/rates"


export default function SeriesCard({ result, media, variant }) {


  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      whileHover={{scale: 1.05, cursor: "pointer"}}
      transition={{type: "tween", duration: 0.15}}
    >
      <figure className="card-img">
        <img
          className="poster"
          src={`${IMAGES_URL}original${result.backdrop_path}`}
          draggable={false}
          alt="poster"
        />
      </figure>
      <div className="card-body">
        <div className="details align-center">
          <h5 className="title truncate">{result.name}</h5>
          <Rates rate={result.vote_average} variant="star" />
        </div>
      </div>
    </motion.div>
  )
}