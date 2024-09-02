import { formatReleaseDate } from "@services/movie-utils"
import { Overlay } from ".."
import { BookmarkButton, InfoButton, LinkButton, BookmarkDeleteButton } from "@components/buttons"
import { Title, Overview } from "@components/movie-details"


export default function SecondaryOverlay({ result, media, ...rest }) {
  const id = result.id
  const title = result.title || result.name
  const { card, setModal } = rest

  return (
    <Overlay.Container variant="secondary">
      <Overlay.Header>
        <Title
          title={title}
          width="auto"
          isTruncated={false}
          customStyles="box-clamp"
        />
      </Overlay.Header>
      <Overlay.Details>
        {card === "bookmarked" && (
          <span className="release-date">
            {formatReleaseDate(result.release_date)}
          </span>
        )}
        <Overview text={result.overview} lines={4} fontSize="fs-sm" customStyles="mt-4" />
      </Overlay.Details>
      <Overlay.Actions>
        {card === "result" ? (
          <>
            <BookmarkButton
              item={{id, media}}
              variants="solid-blured"
              size="square-md"
              iconSize="md"
            />
            <InfoButton
              setModal={setModal}
              variants="solid-blured"
              size="square-md"
              iconSize="lg"
            />
          </>
        ) : (
          <>
            <BookmarkDeleteButton size="square-md" setModal={setModal} />
            <LinkButton
              linkData={{id, media, blank: false}}
              size="square-md"
              iconSize="md"
            />
          </>
        )}
      </Overlay.Actions>
    </Overlay.Container>
  )
}
