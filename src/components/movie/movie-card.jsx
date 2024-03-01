// import { getIMDBRate } from "../../utils/apis"
import { getMovieGenresBaseOnIds } from "@src/utils/utils"

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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
        </i>
        <span className="genres">
          {
            getMovieGenresBaseOnIds(result.genre_ids).map(genre => 
              <span key={genre} className="genre">{genre}</span>
            )
          }
        </span>
          <span className="vote">
            <i className="icon star-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </i>
            <span>{Math.round(result.vote_average * 10) / 10}</span>
          </span>
        </div>
      </div>
      <div className="main-details">
        <h4 className="title">{result.title}</h4>
        <p className="release-date">{result.release_date.slice(0, 4)}</p>
      </div>
    </div>
  )
}
