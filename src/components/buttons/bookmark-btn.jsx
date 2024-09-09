import { isItemBookmarked } from "@lib/supabase/db"
import { useAppContext } from "@src/store"
import { useLoader } from "@lib/hooks"
import { BookmarkIcon } from "@heroicons/outline"
import { Button } from "@lib/ui/components"
import { Spinner } from "../skeletons"

export default function BookmarkButton({ item, setModal, ...props }) {
  const { modalDispatch } = useAppContext()
  const { variant, size, iconSize, className } = props

  const { data: isBookmarked, isLoading } = useLoader(
    () => isItemBookmarked(item),
    { dependencies: [item.id] }
  )

  function showListsModal() {
    modalDispatch({
      type: "save",
      data: {
        id: item.id,
        media: item.media,
      },
    })
  }

  if (isLoading) {
    return (
      <Button
        className={className}
        variant="solid-blured"
        size={size}
        isSquare
      >
        <Spinner className="size-7" />
      </Button>
    )
  }

  return (
    <Button
      className={className}
      variant={isBookmarked ? "solid-primary" : variant}
      size={size}
      isSquare
      iconOnly
      iconSize={iconSize}
      iconFill={isBookmarked ? "fill" : ""}
      svg={<BookmarkIcon />}
      onClick={showListsModal}
    />
  )
}
