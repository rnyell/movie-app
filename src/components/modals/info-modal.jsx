import { useNavigate } from "react-router-dom"
import { IMAGES_URL } from "@services"
import { formatReleaseDate } from "@services/movie-utils"
import { Modal, Button, Dot } from "@lib/ui/components"
import { Rates, Genres, Overview } from "../movie-details"


export default function InfoModal({ result, media, setClose }) {
  const navigate = useNavigate()
  const id = result.id
  const title = result?.title || result?.name
  const href = `/${media === "tv" ? "series" : "movies"}/${id}`

  const {
    backdrop_path,
    release_date,
    vote_average,
    genre_ids,
    overview,
  } = result

  function handleNavigation() {
    navigate(href)
    setClose()
  }

  return (
    <Modal setClose={setClose} size="md">
      <div className="relative">
        <figure>
          <img
            className="w-full unselectable rounded-4xl"
            src={`${IMAGES_URL}w500${backdrop_path}`}
            draggable={false}
          />
        </figure>
        <Rates
          rate={vote_average}
          variant="square"
          customStyles="absolute right-8 -bottom-4"
          style={{outline: "6px solid var(--color-neutral-800)"}}
        />
      </div>
      <div className="p-5 flex-col gap-3">
        <h4>{title}</h4>
        <div className="flex gap-2 fs-sm">
          {media === "movie" && (
            <>
              <span className="release-date">{formatReleaseDate(release_date)}</span>
              <Dot />
            </>
          )}
          <Genres genres={genre_ids} media={media} customStyles="color-neutral-300" />
        </div>
        <Overview text={overview} lines={5} customStyles="mt-4" />
        <div className="mt-5 flex gap-2">
          <Button
            variants="outline-lite"
            size="lg"
            customStyles="rounded-full ml-auto"
            onClick={setClose}
          >
            Dismiss
          </Button>
          <Button
            variants="solid-accent"
            size="lg"
            customStyles="grow rounded-full"
            onClick={handleNavigation}
          >
            More Details
          </Button>
        </div>
      </div>
    </Modal>
  )
}
