import { StarIcon } from "@heroicons/outline"
import { formatRate, formatReleaseDate } from "@utils/utils"


export default function SimilarCard({ result, media, variant }) {

  const {
    title,
    poster_path,
    release_date,
    vote_average
  } = result


  return (
    <div className="movie-card" data-variant={variant}>
      <figure className="card-img">
        <img className="poster" src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
      </figure>
      <div className="card-body flex-col">
        <h5 className="title">{title}</h5>
        <div className="wrapper flex">
          <span className="release-date">{formatReleaseDate(release_date)}</span>
          <span className="vote">
            {/* <i className="icon star-icon"><StarIcon /></i> */}
            <span className="vote-number">{formatRate(vote_average)}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
