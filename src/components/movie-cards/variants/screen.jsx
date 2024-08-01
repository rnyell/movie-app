import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { IMAGES_URL } from "@services"
import { PRICES } from "@services/placeholder-data"
import { useAppContext } from "@src/store"
import { Button } from "@src/lib/ui/components"
import InfoButton from "@components/buttons/info-btn"


export default function ScreenCard({ result, variant, idx }) {
  const { modalDispatch } = useAppContext()
  const navigate = useNavigate()
  const {
    id,
    title,
    poster_path,
    backdrop_path
  } = result

  function showDetailsModal() {
    modalDispatch({
      type: "movie_details",
      data: {
        result: result,
        price: PRICES[idx]
      }
    })
  }

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
          <Button variants="solid-secondary" size="sm" onClick={handleBooking}>
            Book Now
          </Button>
          <InfoButton
            variants="outline-bold"
            size="square-sm"
            iconSize="md"
            setModal={showDetailsModal}
          />
        </div>
      </div>
    </motion.div>
  )
}
