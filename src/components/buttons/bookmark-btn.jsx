import { useLoader } from "@lib/hooks"
import { useAppContext } from "@src/store"
import { isItemBookmarked } from "@lib/supabase/db"
import { BookmarkIcon } from "@heroicons/outline"
import { Button } from "@lib/ui/components"
import { Spinner } from "../skeletons"


export default function BookmarkButton({ item, setModal, ...props }) {
  const { modalDispatch } = useAppContext()
  const { variants, size, iconSize, customStyles } = props

  const { data: isBookmarked, isLoading } = useLoader(
    () => isItemBookmarked(item),
    { dependencies: [item.id] }
  )

  function showListsModal() {
    modalDispatch({
      type: "save",
      data: {
        id: item.id,
        media: item.media
      }
    })
  }

  if (isLoading) {
    return (
      <Button variants="solid-blured" size={size} customStyles={customStyles}>
        <Spinner className="size-7" />
      </Button>
    )
  }

  return (
    <Button
      variants={isBookmarked ? "solid-primary" : variants}
      size={size}
      customStyles={customStyles}
      iconOnly
      iconSize={iconSize}
      iconFill={isBookmarked ? "fill" : ""}
      svg={<BookmarkIcon />}
      onClick={showListsModal}
    />
  )
}
