import { BookmarkSlashIcon } from "@heroicons/solid"
import { Button } from "@lib/ui/components"

export default function BookmarkDeleteButton({ size, onClick }) {
  return (
    <Button
      variant="solid-blured"
      size={size}
      isSquare
      iconOnly
      iconSize="md"
      svg={<BookmarkSlashIcon />}
      onClick={onClick}
    />
  )
}
