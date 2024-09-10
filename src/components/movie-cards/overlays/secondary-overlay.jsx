import { formatReleaseDate } from "@services/movie-utils"
import { Overlay } from ".."
import {
  BookmarkButton,
  InfoButton,
  LinkButton,
  BookmarkDeleteButton,
} from "@components/buttons"
import { Title, Overview } from "@components/movie-details"

export default function SecondaryOverlay({ result, media, variant, setModal }) {
  const id = result.id
  const title = result.title || result.name

  return (
    <Overlay.Container variant="secondary">
      <Overlay.Header>
        <Title
          title={title}
          width="auto"
          isTruncated={false}
          className="box-clamp"
        />
      </Overlay.Header>
      <Overlay.Details>
        {variant === "bookmarked" && (
          <span className="release-date">
            {formatReleaseDate(result.release_date)}
          </span>
        )}
        <Overview
          text={result.overview}
          lines={4}
          className="mt-4 text-[0.775rem]"
        />
      </Overlay.Details>
      <Overlay.Actions>
        {variant === "result" ? (
          <>
            <BookmarkButton
              item={{ id, media }}
              variant="solid-blured"
              size="md"
              iconSize="md"
            />
            <InfoButton
              setModal={setModal}
              variant="solid-blured"
              size="md"
              iconSize="lg"
            />
          </>
        ) : (
          <>
            <BookmarkDeleteButton size="md" onClick={setModal} />
            <LinkButton
              linkData={{ id, media, blank: false }}
              size="md"
              iconSize="md"
            />
          </>
        )}
      </Overlay.Actions>
    </Overlay.Container>
  )
}
