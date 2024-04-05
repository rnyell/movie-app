import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon } from "@heroicons/outline"
import { getGenresBaseOnIds, formatRate, formatRuntime } from "@src/utils/utils"
import { getMovieRuntime } from "@src/utils/apis"


export default function MovieCard({ result, type }) {
  const [runtime, setRuntime] = useState(null)

  useEffect(() => {
    /* when type="screen" */
    getMovieRuntime(result.id).then(d => setRuntime(d))
  }, [])

  // console.log(result)
  switch (type) {
    case "series": {
      return (
        <div data-type={type} className="movie-card">
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
              alt="poster" className="poster"
              draggable="false" /* imp */
            />
          </figure>
          <h5 className="title">{result.name}</h5>
          <div className="details">
            <span className="vote">
              <i className="icon star-icon"><StarIcon /></i>
              <span className="vote-number">{formatRate(result.vote_average)}</span>
            </span>
          </div>
        </div>
      )
    }

    case "screen": {
      return (
        <div data-type={type} className="movie-card">
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
              alt="poster" className="poster"
              draggable="false" /* imp */
            />
          </figure>
          <h5 className="title">{result.title}</h5>
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

    case "result": {
      return (
        <motion.div 
          className="movie-card"
          data-type={type}
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
                .map(genre =>
                  <span key={genre} className="genre">{genre}</span>
                )
              }
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
            <h4 className="title">{result?.title || result.name}</h4>
            <p className="release-date">{result?.release_date?.slice(0, 4) || result?.first_air_date?.slice(0, 4)}</p>
          </div>
        </motion.div>
      )
    }
  }
  
}
