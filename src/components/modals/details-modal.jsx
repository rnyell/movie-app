import { useNavigate } from "react-router-dom"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { formatRuntime, formatReleaseDate, getMovieDirector } from "@services/movie-utils"
import { Modal, Button, Dot } from "@lib/ui/components"
import { Rates, Genres, Overview, Casts } from "../movie-details"
import { DetailsModalSkeleton } from "../skeletons"

import "./details-modal.css"


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

  // TODO: `.movie-details-modal` is unnecessary. style the <Modal /> itself
  return (
    <Modal size="lg" setClose={setClose}>
      <div className="movie-details-modal align-center-col">
        {isLoading ? (
          <DetailsModalSkeleton />
        ) : (
          <>
            <div className="modal-img relative w-full">
              <figure className="::before-abs">
                <img
                  className="w-full unselectable rounded-4xl"
                  src={`${IMAGES_URL}w500${backdrop_path}`}
                  draggable={false}
                />
              </figure>
              <div className="px-6 pb-2 absolute bottom-0 w-full">
                <div className="align-center">
                  <h4 className="title">{title}</h4>
                  <Rates rate={vote_average} variant="square" customStyles="ml-auto mr-2" />
                </div>
                <div className="main-details mt-2 align-center gap-2 fs-sm">
                  <span className="release-date">{formatReleaseDate(release_date)}</span>
                  <Dot />
                  <span className="runtime">{formatRuntime(runtime)}</span>
                  <Dot />
                  <Genres genres={genres} media="movie" customStyles="color-inherit" />
                </div>
              </div>
            </div>
            <div className="p-6 w-full">
              <div className="sub-details flex-col gap-2">
                <Overview text={overview} />
                <div className="mt-2">
                  <Casts
                    casts={credits.cast}
                    variant="list"
                    mode="names"
                    withImage={false}
                  />
                  <div className="mt-2 align-center">
                    <h6 className="heading">Director:</h6>
                    <p className="ml-[5px]">{getMovieDirector(credits.crew)}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="p-6 w-full align-center gap-2">
          <span className="price unselectable">${price}</span>
          <Button
            variants="outline-lite"
            customStyles="ml-auto"
            onClick={setClose}
          >
            Dismiss
          </Button>
          <Button variants="solid-accent" onClick={handleBooking}>Buy Ticket</Button>
        </div>
      </div>
    </Modal>
  )
}
