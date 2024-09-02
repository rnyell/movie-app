import { useAppContext } from "@src/store"
import { BookmarkSlashIcon } from "@heroicons/solid"
import { Button, Icon } from "@lib/ui/components"


export default function BookmarkDeleteButton({ size }) {
  const { modalDispatch } = useAppContext()

  return (
    <Button
      variants="solid-blured"
      size={size}
      iconOnly
      iconSize="md"
      svg={<BookmarkSlashIcon />}
      onClick={() => setModal(true)}
    />
  )
}
