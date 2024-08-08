import { useNavigate } from "react-router-dom"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { formatRuntime, formatReleaseDate, getMovieDirector } from "@services/movie-utils"
import { Modal, Button, Dot } from "@lib/ui/components"
import { Rates, Genres, Overview, Casts } from "../movie-details"


export default function DetailsModal({ result, setClose, price }) {
  const { mediaDetails, isLoading } = useMediaDetails("movie", result.id)
  const navigate = useNavigate()

  const {
    id,
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
        id,
        title,
        poster_path,
        backdrop_path,
        price,
      }
    })
  }


  if (isLoading) {
    return null
  }

  return (
    <Modal size="lg" setClose={setClose}>
      <div className="movie-details-modal align-center-col">
        <div className="modal-img relative w-100%">
          <figure className="::before-abs">
            <img
              className="poster w-100% unselectable"
              src={`${IMAGES_URL}w500${backdrop_path}`}
              draggable={false}
            />
          </figure>
          <div className="absolute bottom-0 w-100%">
            <div className="align-center">
              <h4 className="title">{title}</h4>
              <Rates rate={vote_average} variant="square" customStyles="ml-auto mr-2" />
            </div>
            <div className="main-details align-center">
              <span className="release-date">{formatReleaseDate(release_date)}</span>
              <Dot />
              <span className="runtime">{formatRuntime(runtime)}</span>
              <Dot />
              <Genres genres={genres} media="movie" customStyles="color-inherit" />
            </div>
          </div>
        </div>
        <div className="modal-body w-100%">
          <div className="sub-details flex-col">
            <Overview text={overview} />
            <div className="credits">
              <Casts
                casts={credits.cast}
                variant="list"
                mode="names"
                withImage={false}
              />
              <div className="director align-center">
                <h6 className="heading">Director:</h6>
                <p className="director-name">{getMovieDirector(credits.crew)}</p>
              </div>
            </div>
          </div>
          <div className="btns align-center">
            <span className="price unselectable">${price}</span>
            <Button
              variants="outline-lite"
              size="md"
              customStyles="ml-auto"
              onClick={setClose}
            >
              Dismiss
            </Button>
            <Button
              variants="solid-accent"
              size="md"
              onClick={handleBooking}
            >
              Buy Ticket
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
