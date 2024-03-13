import { StarIcon, BookmarkIcon, FilmIcon, TvIcon } from "@heroicons"
import { getGenresBaseOnIds, formatRate } from "@src/utils/utils"


export default function MovieCard({ result }) {
  
  return (
    <div className="movie-card">
      <div className="subset-details">
        <i className="icon media-icon">
          {result.media_type === "movie" ? <FilmIcon /> : <TvIcon />}
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
            getGenresBaseOnIds(result.media_type, result.genre_ids).map(genre =>
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
    </div>
  )
}
