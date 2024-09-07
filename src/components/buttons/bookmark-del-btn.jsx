import { BookmarkSlashIcon } from "@heroicons/solid"
import { Button } from "@lib/ui/components"

export default function BookmarkDeleteButton({ size, onClick }) {
  return (
    <Button
      variants="solid-blured"
      size={size}
      iconOnly
      iconSize="md"
      svg={<BookmarkSlashIcon />}
      onClick={onClick}
    />
  )
}
