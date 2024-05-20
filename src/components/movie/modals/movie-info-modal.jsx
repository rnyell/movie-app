import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
// import { useMediaDetails } from "@utils/hooks"
import { modalBackdropVariants, modalVariants, defaultVariantsLabel, modalTransition } from "@utils/motions"
import { writeLocalStorage, formatReleaseDate, transformTitleToURL } from "@utils/utils"
import Rates from "@components/movie/details/rates"
import Genres from "@components/movie/details/genres"
import Overview from "@components/movie/details/overview"
import Casts from "@components/movie/details/casts"


export default function MovieInfoModal({ result, media, setModal }) {
  // const {mediaDetails, isLoading} = useMediaDetails("movie", result.id)
  const navigate = useNavigate()
  const title = result.title || result.name
  const href = `/${transformTitleToURL(title)}`
  const state = {
    id: result.id,
    media: media,
    prevUrl: location.pathname + location.search,
  }

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
    navigate(href, { state })
    writeLocalStorage("linkData", state)
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
        className="modal movie-info-modal"
        variants={modalVariants}
        {...defaultVariantsLabel}
        transition={modalTransition}
      >
        <div className="modal-img">
          <figure>
            <img
              className="poster w-100 unselectable"
              src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
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
            <button className="btn dismiss-btn" onClick={() => setModal(false)}>Dismiss</button>
            <button className="btn info-btn" onClick={handleNavigation}>See More</button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
