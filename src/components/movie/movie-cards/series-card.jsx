import { StarIcon, BookmarkIcon } from "@heroicons/outline"
import { formatRate } from "@utils/utils"
import { IMAGES_URL } from "@utils/apis"


export default function SeriesCard({ result, media, variant }) {


  return (
    <div data-variant={variant} className="movie-card">
      <figure>
        <img
          className="poster"
          src={`${IMAGES_URL}original${result.backdrop_path}`}
          alt="poster"
          draggable="false"
        />
      </figure>
      <h5 className="title truncate">{result.name}</h5>
      <div className="details">
        <span className="vote">
          <i className="icon star-icon"><StarIcon /></i>
          <span className="vote-number">{formatRate(result.vote_average)}</span>
        </span>
      </div>
    </div>
  )
}