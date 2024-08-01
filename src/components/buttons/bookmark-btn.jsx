import { useLoader } from "@src/lib/hooks"
import { useAppContext } from "@src/store"
import { isItemBookmarked } from "@src/lib/supabase/db"
import { BookmarkIcon } from "@heroicons/outline"
import { Button } from "@src/lib/ui/components"


export default function BookmarkButton({ item, setModal, ...props }) {
  const { modalDispatch } = useAppContext()
  const { variants, size, iconSize, customStyles } = props

  const { data: isBookmarked = false } = useLoader(
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
