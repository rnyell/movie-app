import { useAppContext } from "@src/store"
import { isItemLiked } from "@lib/supabase/db"
import { useLoader } from "@lib/hooks"
import { HeartIcon } from "@heroicons/outline"
import { Button } from "@lib/ui/components"
import { Spinner } from "../skeletons"

export default function FaveButton({ item }) {
  const { modalDispatch } = useAppContext()
  const { id, media } = item

  const { data: isFaved, isLoading } = useLoader(() => isItemLiked(item))

  function onFave() {
    // modalDispatch({
    //   type: "fave",
    //   data: { id, media }
    // })
  }

  if (isLoading) {
    return (
      <Button
        className="rounded-full"
        variant="outline-bold"
        size="xl"
        isSquare
      >
        <Spinner className="size-8" />
      </Button>
    )
  }

  return (
    <Button
      className="rounded-full"
      variant={isFaved ? "solid-primary" : "outline-bold"}
      size="xl"
      isSquare
      iconOnly
      iconSize="xl"
      iconFill={isFaved ? "fill" : ""}
      svg={<HeartIcon />}
      onClick={onFave}
    />
  )
}
