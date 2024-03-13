import { StarIcon, 	BookmarkIcon } from "@heroicons"
import { getMovieGenresBaseOnIds, formatRate } from "@src/utils/utils"

import "@styles/movie-card.css"


export default function MovieCard({ result }) {
  
  return (
    <div className="movie-card">
      <div className="subset-details">
        <i className="icon play-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
        </i>
        <figure>
          <img 
            src={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
            alt="poster" 
            className="poster" />
        </figure>
        <div className="hover-overlay">
        <i className="icon bookmark-icon">
          <BookmarkIcon />
        </i>
        <span className="genres">
          {
            getMovieGenresBaseOnIds(result.media_type, result.genre_ids).map(genre =>
              <span key={genre} className="genre">{genre}</span>
            )
          }
        </span>
          <span className="vote">
            <i className="icon star-icon">
              <StarIcon />
            </i>
            <span>{formatRate(result.vote_average)}</span>
          </span>
        </div>
      </div>
      <div className="main-details">
        <h4 className="title">{result?.title || result.name}</h4>
        <p className="release-date">{result?.release_date?.slice(0, 4) || result?.first_air_date?.slice(0, 4)}</p>
      </div>
    </div>
  )
}
