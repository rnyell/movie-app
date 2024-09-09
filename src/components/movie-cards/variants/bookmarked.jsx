import { useRef, useState } from "react"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { useAppContext } from "@src/store"
import { useClickOutside, useWindowOffsets } from "@lib/hooks"
import { EllipsisIcon } from "@lib/ui/icons"
import { XMarkIcon } from "@heroicons/outline"
import { CardSkeleton } from "@components/skeletons"
import { Presence } from "@lib/motion"
import { Button } from "@lib/ui/components"
import { Card } from ".."
import { Title } from "@components/movie-details"
import SecondaryOverlay from "../overlays/secondary-overlay"
import { updateBookmarks } from "@src/lib/supabase/db"

// runtime & release date for tv shows?

export default function BookmarkedCard({ id, media, variant, listId }) {
  const { modalDispatch } = useAppContext()
  const [cardOverlay, setCardOverlay] = useState(false)
  const cardRef = useRef()

  const { windowWidth } = useWindowOffsets()
  const isTouchDevice = windowWidth <= 520

  useClickOutside(cardRef, hideOverlay)

  const { mediaDetails, isLoading } = useMediaDetails(media, id)

  if (media === "movie") {
    // `var` used to let (pun!) variables to be accessible outside of `if` cardRef.
    var { title, poster_path } = mediaDetails
  } else if (media === "tv") {
    var { name: title, poster_path } = mediaDetails
  }

  function showOverlay() {
    setCardOverlay(true)
  }

  function hideOverlay() {
    setCardOverlay(false)
  }

  function deleteBookmark() {
    modalDispatch({
      type: "confirmation",
      data: {
        msg: "Are you sure you want to remove this from your list?",
        onConfirm: async function () {
          const item = { id, media }
          const t = await updateBookmarks("delete", listId, item)
        },
      },
    })
  }

  if (isLoading) {
    return <CardSkeleton variant="bookmark" />
  }

  return (
    <Card.Container variant={variant} ref={cardRef}>
      <Card.Figure
        src={`${IMAGES_URL}original${poster_path}`}
        isMotion
        onHoverStart={!isTouchDevice && showOverlay}
        onHoverEnd={!isTouchDevice && hideOverlay}
      >
        <Presence trigger={cardOverlay}>
          <SecondaryOverlay
            variant="bookmarked"
            result={mediaDetails}
            media={media}
            setModal={deleteBookmark}
          />
        </Presence>
        <div
          className="ambient"
          style={{
            backgroundImage: `url(${IMAGES_URL}original${poster_path})`,
          }}
        />
      </Card.Figure>
      <Card.Body customStyles="align-center gap-1">
        <Title title={title} width="90%" />
        <Card.TouchWidget customStyles="ml-auto">
          <Button
            variant="solid-blured"
            size="xs"
            className="rounded-lg"
            isSquare
            iconOnly
            iconSize="md"
            svg={cardOverlay ? <XMarkIcon /> : <EllipsisIcon />}
            iconClassname="stroke-3 unselectable"
            onClick={() => setCardOverlay(!cardOverlay)}
          />
        </Card.TouchWidget>
      </Card.Body>
    </Card.Container>
  )
}
