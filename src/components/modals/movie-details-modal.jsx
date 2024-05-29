import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { formatRuntime, formatReleaseDate, getMovieDirector } from "@services/movie-utils"
import { modalBackdropVariants, modalVariants, defaultVariantsLabel, modalTransition } from "@utils/motions"
import Rates from "@components/movie/details/rates"
import Genres from "@components/movie/details/genres"
import Overview from "@components/movie/details/overview"
import Casts from "../movie/details/casts"


export default function MovieDetailsModal({ result, setModal, price }) {
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

  return createPortal(
    <>
      <motion.div
        className="modal-backdrop"
        onClick={() => setModal(false)}
        variants={modalBackdropVariants}
        {...defaultVariantsLabel}
      />
      <motion.div
        className="modal movie-details-modal align-center-col"
        variants={modalVariants}
        {...defaultVariantsLabel}
        transition={modalTransition}
      >
        <div className="modal-img w-100">
          <figure>
            <img
              className="poster w-100 unselectable"
              src={`${IMAGES_URL}w500${backdrop_path}`}
              draggable={false}
            />
          </figure>
        </div>
        <div className="modal-body w-100">
          <div className="align-center">
            <h4 className="title">{title}</h4>
            <Rates rate={vote_average} variant="square" />
          </div>
          <div className="main-details align-center">
            <span className="release-date">{formatReleaseDate(release_date)}</span>
            <i className="dot">&#x2022;</i>
            <span className="runtime">{formatRuntime(runtime)}</span>
            <i className="dot">&#x2022;</i>
            <Genres genres={genres} media="movie" />
          </div>
          <div className="sub-details">
            <Overview text={overview} />
            <div className="credits">
              <Casts casts={credits.cast} mode="names" />
              <div className="director align-center">
                <h6>Directed by:</h6>
                <p className="director-name">{getMovieDirector(credits.crew)}</p>
              </div>
            </div>
          </div>
          <div className="btns align-center">
            <span className="price unselectable">${price}</span>
            <button className="btn dismiss-btn" onClick={() => setModal(false)}>Dismiss</button>
            <button className="btn buy-btn" onClick={handleBooking}>Buy Ticket</button>
          </div>
        </div>
      </motion.div>
    </>,
    document.getElementById("portal")
  )
}
