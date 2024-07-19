import { useNavigate } from "react-router-dom"
import { IMAGES_URL } from "@services"
import { formatReleaseDate } from "@services/movie-utils"
import { Modal, Button } from "@src/lib/ui/components"
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


  return (
    <Modal setClose={() => setModal(false)} size="md">
      <div className="movie-info-modal">
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
            <Button
              variants="outline-light"
              size="lg"
              customStyles="rounded-full ml-auto"
              onClick={() => setModal(false)}
            >
              Dismiss
            </Button>
            <Button
              variants="solid-accent"
              size="lg"
              customStyles="grow-1 rounded-full"
              onClick={handleNavigation}
            >
              See More
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
