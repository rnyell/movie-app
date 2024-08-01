import { useAppContext } from "@src/store"
import { HeartIcon } from "@heroicons/outline"
import { Button } from "@src/lib/ui/components"
import { useLoader } from "@src/lib/hooks"


export default function FaveButton({ item }) {
  const { modalDispatch } = useAppContext()
  const { id, media } = item

  const { data: isFaved } = useLoader()

  function onFave() {
    modalDispatch({
      type: "fave",
      data: { id, media }
    })
  }


  return (
    <Button
      variants={isFaved ? "solid-primary" : "outline-bold"}
      size="square-xl"
      customStyles="rounded-full"
      iconOnly
      iconSize="xl"
      iconFill={isFaved ? "fill" : ""}
      svg={<HeartIcon />}
      onClick={onFave}
    />
  )
}
