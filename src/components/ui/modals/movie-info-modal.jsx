import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { modalBackdropVariants, modalVariants, defaultVariantsLabel, modalTransition } from "@lib/motion/motions"
import { IMAGES_URL } from "@services"
import { formatReleaseDate } from "@services/movie-utils"
import Rates from "@components/movie/details/rates"
import Genres from "@components/movie/details/genres"
import Overview from "@components/movie/details/overview"
import Casts from "@components/movie/details/casts"


export default function MovieInfoModal({ result, media, setModal }) {
  const navigate = useNavigate()
  const id = result.id
  const title = result.title || result.name
  const href = `/${media === "tv" ? "series" : "movies"}/${id}`

  const {
    poster_path,
    backdrop_path,
    release_date,
    vote_average,
    runtime,
    genre_ids,
    overview,
    credits,
  } = result

  function handleNavigation() {
    navigate(href)
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
        className="modal movie-info-modal"
        variants={modalVariants}
        {...defaultVariantsLabel}
        transition={modalTransition}
      >
        <div className="modal-img">
          <figure>
            <img
              className="poster w-100 unselectable"
              src={`${IMAGES_URL}w500${backdrop_path}`}
              draggable={false}
            />
          </figure>
          <Rates rate={vote_average} variant="square" />
        </div>
        <div className="modal-body flex-col">
          <h5 className="title">{title}</h5>
          <div className="details flex">
            {media === "movie" && (
              <>
                <span className="release-date">{formatReleaseDate(release_date)}</span>
                <i className="dot">&#x2022;</i>
              </>
            )}
            <Genres genres={genre_ids} media={media} />
          </div>
          <Overview text={overview} />
          <Casts moda="names" />
          <div className="btns flex">
            <button className="btn dismiss-btn" type="button" onClick={() => setModal(false)}>Dismiss</button>
            <button className="btn info-btn" type="button" onClick={handleNavigation}>See More</button>
          </div>
        </div>
      </motion.div>
    </>,
    document.getElementById("portal")
  )
}
