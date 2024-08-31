import { useLoader } from "@lib/hooks"
import { useAppContext } from "@src/store"
import { isItemBookmarked } from "@lib/supabase/db"
import { BookmarkIcon } from "@heroicons/outline"
import { Button } from "@lib/ui/components"


export default function BookmarkButton({ item, setModal, ...props }) {
  const { modalDispatch } = useAppContext()
  const { variants, size, iconSize, customStyles } = props

  const { data: isBookmarked = false } = useLoader(
    () => isItemBookmarked(item),
    { dependencies: [item.id] }
  )

  console.log(isBookmarked)

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
