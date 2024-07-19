import { useEffect, useState } from "react"
import { isItemBookmarked } from "@src/lib/supabase/db"
import { BookmarkIcon } from "@heroicons/outline"
import { Button } from "@src/lib/ui/components"


export default function BookmarkButton({ item, setModal, ...props }) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { variants, size, iconSize, customStyles } = props

  useEffect(() => {
    loader()
  }, [item.id])
  
  async function loader() {
    const hasBookmarked = await isItemBookmarked(item)
    setIsBookmarked(hasBookmarked)
  }

  function showListsModal() {
    setModal(true)
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
