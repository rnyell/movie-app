import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
// import { StarIcon } from "@heroicons/outline"
import { useMediaDetails } from "@utils/hooks"
import { formatRate, formatRuntime, formatReleaseDate, getMovieGenres, getMovieDirector } from "@utils/utils"
import { modalBackdropVariants, modalVariants, defaultVariantsLabel, modalTransition } from "@utils/motions"


export default function MovieModal({ result, setModal, price }) {
  const {mediaDetails, isLoading} = useMediaDetails("movie", result.id)
  const navigate = useNavigate()

  const {
    title,
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    runtime,
    genres,
    credits,
    overview,
  } = mediaDetails

  function handleBooking() {
    navigate("/booking", {
      state: {
        title, poster_path, backdrop_path
      }
    })
  }


  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <motion.div
        className="modal-backdrop"
        onClick={() => setModal(false)}
        variants={modalBackdropVariants}
        {...defaultVariantsLabel}
      />
      <motion.div
        className="modal movie-modal align-center-col"
        variants={modalVariants}
        {...defaultVariantsLabel}
        transition={modalTransition}
      >
        <div className="modal-img w-100">
          <figure>
            <img
              className="poster w-100 unselectable"
              src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
              draggable="false"
            />
          </figure>
        </div>
        <div className="modal-body w-100">
          <div className="align-center">
            <h4 className="title">{title}</h4>
            <span className="vote unselectable">
              {/* <i className="icon star-icon"><StarIcon /></i> */}
              <span className="vote-number">{formatRate(vote_average)}</span>
            </span>
          </div>
          <div className="main-details align-center">
            <span className="release-date">{formatReleaseDate(release_date)}</span>
            <i className="dot">&#x2022;</i>
            <span className="runtime">{formatRuntime(runtime)}</span>
            <i className="dot">&#x2022;</i>
            <div className="genres">
              <span>{getMovieGenres(genres)}</span>
            </div>
          </div>
          <div className="sub-details">
            <div className="overview">
              {/* <h6>Plot</h6> */}
              <p className="box-clamp">{overview}</p>
            </div>
            <div className="credits">
              <div className="director align-center">
                <h6>Directed by:</h6>
                <p className="director-name">{getMovieDirector(credits.crew)}</p>
              </div>
              <div className="casts align-center flex-wrap">
                <h6>Starring:</h6>
                {credits.cast.slice(0, 4).map(c =>
                  <p key={c.name} className="cast-name">{c.name}<span>,</span></p>
                )}
              </div>
            </div>
          </div>
          <div className="btns align-center">
            <span className="price unselectable">{price}$</span>
            <button className="btn dismiss-btn" onClick={() => setModal(false)}>Dismiss</button>
            <button className="btn buy-btn" onClick={handleBooking}>Buy Ticket</button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
