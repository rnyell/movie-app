import { useNavigate } from "react-router-dom"
import { IMAGES_URL } from "@services"
import { PRICES } from "@services/placeholder-data"
import { useAppContext } from "@src/store"
import { Button } from "@lib/ui/components"
import { Card } from ".."
import { Title } from "@components/movie-details"
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
    <Card.Container
      isMotion
      data-variant={variant}
      initial={{opacity: 0.9}}
      whileHover={{opacity: 1, scale: 1.05}}
      transition={{type: "tween", duration: 0.15}}
    >
      <Card.Figure src={`${IMAGES_URL}w500${backdrop_path}`} />
      <Card.Body customStyles="flex-col gap-4">
        <Title title={title} width="90%" />
        <div className="align-center gap-2">
          <span className="price flex-center unselectable">${PRICES[idx]}</span>
          <InfoButton
            variants="outline-bold"
            size="square-sm"
            customStyles="ml-auto"
            iconSize="md"
            setModal={showDetailsModal}
          />
          <Button
            variants="solid-secondary"
            size="sm"
            onClick={handleBooking}
          >
            Book Now
          </Button>
        </div>
      </Card.Body>
    </Card.Container>
  )
}
