import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { IMAGES_URL } from "@services"
import { PRICES } from "@services/placeholder-data"
import InfoButton from "@components/ui/buttons/info-btn"
import MovieDetailsModal from "@components/ui/modals/movie-details-modal"


export default function ScreenCard({ result, variant, idx }) {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const {
    id,
    title,
    poster_path,
    backdrop_path
  } = result


  function handleBooking() {
    navigate("/booking", {
      state: {
        id,
        title,
        poster_path,
        backdrop_path,
        price: PRICES[idx]
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
          src={`${IMAGES_URL}w500${backdrop_path}`}
          draggable={false}
          alt="poster"
        />
      </figure>
      <div className="card-body flex-col">
        <div className="sm-details flex">
          <h5 className="title truncate">{title}</h5>
          <span className="price">${PRICES[idx]}</span>
        </div>
        <div className="cta-btns flex">
          <button className="btn book-btn" onClick={handleBooking}>Book Now</button>
          <InfoButton setModal={setShowModal} />
        </div>
      </div>
      {<AnimatePresence>
        {showModal && (
          <MovieDetailsModal
            result={result}
            price={PRICES[idx]}
            setModal={setShowModal}
          />
        )}
      </AnimatePresence>}
    </motion.div>
  )
}
