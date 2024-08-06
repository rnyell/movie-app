import { useMediaDetails } from "@services/hooks"
import { formatReleaseDate } from "@services/movie-utils"
import { Overlay } from ".."
import { Title, Genres, Overview } from "@components/movie-details"
import LinkButton from "@components/buttons/link-btn"
import BookmarkButton from "@components/buttons/bookmark-btn"


export default function SeriesOverlay({ result }) {
  const id = result.id
  const media = "tv"
  const linkData = { id, media, blank: false }
  const { mediaDetails, isLoading } = useMediaDetails(media, id)

  const {
    // name: title,
    first_air_date,
    last_air_date,
    in_production,
    number_of_seasons,
    // overview,
    // vote_average,
    genres
  } = mediaDetails


  return (
    <Overlay.Container variant="series">
      <Overlay.Details>
        {/* <Overview text={overview} /> */}
        <div>
          <Genres genres={genres} media={media} isMultiline customStyles="fs-smaller" />
        </div>
        <div className="flex gap-2">
          <span className="release-date">
            {(in_production || number_of_seasons === 1)
              ? formatReleaseDate(first_air_date)
              : `${formatReleaseDate(first_air_date)} ‒ ${formatReleaseDate(last_air_date)}`
            }
          </span>
          <i className="dot">&#x2022;</i>
          <span>{number_of_seasons} {number_of_seasons > 1 ? "Seasons" : "Season"}</span>
        </div>
      </Overlay.Details>
      <Overlay.Actions>
        <LinkButton size="square-md" linkData={linkData} />
        <BookmarkButton
          item={{id, media}}
          variants="solid-blured"
          size="square-md"
          iconSize="md"
        />
      </Overlay.Actions>
    </Overlay.Container>
  )
}
