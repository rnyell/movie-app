import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon } from "@heroicons/outline"
import { BookmarkSlashIcon, PlayIcon } from "@heroicons/solid"
import { getGenresBaseOnIds, formatRate, formatRuntime, formatReleaseDate } from "@src/utils/utils"


export default function ResultCard({ result, type, variant }) {

  return (
    <motion.div 
      className="movie-card"
      data-variant={variant}
      layout
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ opacity: 0.2 }}
    >
      <div className="subset-details">
        <i className="icon media-icon">
          {result.media_type === "movie" ? <FilmIcon /> : <TvIcon />}
        </i>
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
            alt="poster" 
            className="poster"
          />
        </figure>
        <div className="hover-overlay">
        <i className="icon bookmark-icon">
          <BookmarkIcon />
        </i>
        <span className="genres">
          {getGenresBaseOnIds(result.media_type, result.genre_ids)
            .map(genre => <span key={genre} className="genre">{genre}</span>
          )}
        </span>
          <span className="vote">
            <i className="icon star-icon">
              <StarIcon />
            </i>
            <span className="vote-number">{formatRate(result.vote_average)}</span>
          </span>
        </div>
      </div>
      <div className="main-details">
        <h4 className="title truncate">{result?.title || result.name}</h4>
        <p className="release-date">
          {formatReleaseDate(result?.release_date) || formatReleaseDate(result?.first_air_date)}
        </p>
      </div>
    </motion.div>
  )
}