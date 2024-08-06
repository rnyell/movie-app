import { useWindowOffsets } from "@lib/hooks"
import { useMediaDetails } from "@services/hooks"
import { formatRuntime, formatReleaseDate } from "@services/movie-utils"
import { Overlay } from ".."
import { Title, Rates } from "@components/movie-details"
import WatchButton from "@components/buttons/watch-btn"
import LinkButton from "@components/buttons/link-btn"
import BookmarkButton from "@components/buttons/bookmark-btn"


export default function PrimaryOverlay({ result, media }) {
  const id = result.id
  const linkData = { id, media, blank: true }
  const { mediaDetails, isLoading } = useMediaDetails(media, id)
  const { windowWidth } = useWindowOffsets()
  const buttonSize = windowWidth >= 460 ? "square-md" : "square-sm"


  switch (media) {
    case "movie": {
      const {
        title,
        release_date,
        runtime,
        vote_average
      } = mediaDetails

      return (
        <Overlay.Container variant="primary">
          <Overlay.Header>
            <Title
              title={title}
              size="lg"
              width="95%"
              isTruncated={false}
            />
          </Overlay.Header>
          <Overlay.Details>
            <span className="overlay-release-date">{formatReleaseDate(release_date)}</span>
            <i className="overlay-dot">&#x2022;</i>
            <span className="overlay-runtime">{formatRuntime(runtime)}</span>
            <i className="overlay-dot">&#x2022;</i>
            <Rates rate={vote_average} variant="star" />
          </Overlay.Details>
          <Overlay.Actions>
            <WatchButton item={{id, title, media}} size={buttonSize} iconSize="md" />
            <LinkButton linkData={linkData} size={buttonSize} iconSize="md" />
            <BookmarkButton item={{id, media}} variants="solid-blured" size={buttonSize} iconSize="md" />
          </Overlay.Actions>
        </Overlay.Container>
      )
    }
    case "tv": {
      const {
        name: title,
        first_air_date,
        last_air_date,
        in_production,
        number_of_seasons,
        vote_average,
      } = mediaDetails

      return (
        <Overlay.Container variant="primary">
          <Overlay.Header customStyles="flex">
            <Title
              title={title}
              size="lg"
              width="85%"
              isTruncated={false}
            />
            <Rates rate={vote_average} variant="star" />
          </Overlay.Header>
          <Overlay.Details>
            <span className="overlay-release-date">
              {in_production
                ? formatReleaseDate(first_air_date)
                : `${formatReleaseDate(first_air_date)} ‒ ${formatReleaseDate(last_air_date)}`
              }
            </span>
            <i className="overlay-dot">&#x2022;</i>
            <span>{number_of_seasons} {number_of_seasons > 1 ? "Seasons" : "Season"}</span>
          </Overlay.Details>
          <Overlay.Actions>
            <WatchButton item={{id, title, media}} size={buttonSize} iconSize="md" />
            <LinkButton linkData={linkData} size={buttonSize} iconSize="md" />
            <BookmarkButton
              item={{id, media}}
              variants="solid-blured"
              size={buttonSize}
              iconSize="md"
            />
          </Overlay.Actions>
        </Overlay.Container>
      )
    }
  }
}
