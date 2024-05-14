import { useState } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { InfoIcon } from "@utils/icons"
import { PRICES } from "@src/store/placeholder-data"
import MovieModal from "../movie-modal"


export default function ScreenCard({ result, variant, idx }) {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const {
    title,
    poster_path,
    backdrop_path
  } = result


  function handleBooking() {
    navigate("/booking", {
      state: {
        title,
        poster_path,
        backdrop_path
      }
    })
  }

  return (
    <motion.div
      className="movie-card"
      data-variant={variant}
      initial={{opacity: 0.9}}
      whileHover={{opacity: 1, scale: 1.05}}
      transition={{type: "tween", duration: 0.15}}
    >
      <figure className="card-img">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} /* original or w500? */
          alt="poster"
          draggable="false"
        />
      </figure>
      <div className="card-body flex-col">
        <div className="sm-details flex">
          <h5 className="title truncate">{title}</h5>
          <span className="price">{PRICES[idx]}$</span>
        </div>
        <div className="cta-btns flex">
          <button className="btn book-btn" onClick={handleBooking}>Book Now</button>
          <button className="btn info-btn" onClick={() => setShowModal(true)}>
            <i className="icon"><InfoIcon /></i>
          </button>
        </div>
      </div>
      {createPortal(
        <AnimatePresence>
          {showModal && (
            <MovieModal
              result={result}
              price={PRICES[idx]}
              setModal={setShowModal}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  )
}
