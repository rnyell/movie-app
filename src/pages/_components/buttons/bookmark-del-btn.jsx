import { BookmarkSlashIcon } from "@heroicons/solid"
import { Button, Icon } from "@src/lib/ui/components"


export default function BookmarkDeleteButton({ setModal }) {
  return (
    <Button
      variants="solid-blured"
      size="square-md"
      iconOnly
      iconSize="md"
      svg={<BookmarkSlashIcon />}
      onClick={() => setModal(true)}
    />
  )
}
