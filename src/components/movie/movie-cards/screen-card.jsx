import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon } from "@heroicons/outline"
import { getMovieDetails, getMediaRuntime } from "@utils/apis"
import { formatRate, formatRuntime } from "@utils/utils"

export default function ScreenCard({ result, type, variant }) {
  const [runtime, setRuntime] = useState(null)

  useEffect(() => {
    getMediaRuntime("movie", result.id).then(d => setRuntime(d))
  }, [])

  return (
    <div data-variant={variant} className="movie-card">
      <figure>
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${result.backdrop_path}`} /* original or w500? */
          alt="poster"
          draggable="false"
        />
      </figure>
      <h5 className="title truncate">{result.title}</h5>
      <div className="details">
        <span className="runtime">{formatRuntime(runtime)}</span>
        <span className="vote">
          <i className="icon star-icon"><StarIcon /></i>
          <span className="vote-number">{formatRate(result.vote_average)}</span>
        </span>
      </div>
    </div>
  )
}