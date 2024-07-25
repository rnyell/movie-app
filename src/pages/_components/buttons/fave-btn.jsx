import { useState } from "react"
import { HeartIcon } from "@heroicons/outline"
import { useUserContext } from "@src/store/user-context"
import { Button } from "@src/lib/ui/components"


export default function FaveButton({ item }) {
  const { id, media} = item
  const [isFaved, setIsFaved] = useState(false)


  return (
    <Button
      variants={isFaved ? "solid-primary" : "outline-bold"}
      size="square-xl"
      customStyles="rounded-full"
      iconOnly
      iconSize="xl"
      iconFill={isFaved ? "fill" : ""}
      svg={<HeartIcon />}
      onClick={() => setIsFaved(!isFaved)}
    />
  )
}
