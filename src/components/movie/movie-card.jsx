import { getIMDBRate } from "../../utils/apis"
import { getMovieGenresBaseOnIds } from "../../utils/utils"

import "../styles/movie-card.css"


export default function MovieCard({ result }) {
  
  return (
    <div className="movie-card">
      <figure>
        <img 
          src={`https://image.tmdb.org/t/p/w300${result.poster_path}`} 
          alt="movie-poster" 
          className="movie-poster" />
      </figure>
      <h4 className="movie-title">{result.title}</h4>
      <p className="release-date">{result.release_date.slice(0, 4)}</p>
      <div className="hover-overlay">
        <span>{getMovieGenresBaseOnIds(result.genres_ids)}</span>
        {/* <span className="imdb-rate">{getIMDBRate(result.title)}</span> */}
      </div>
    </div>
  )
}
