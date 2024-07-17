import { useState } from "react"
import { HeartIcon } from "@heroicons/outline"
import { useLocalStorage } from "@lib/hooks"
import { useUserContext } from "@src/store/user-context"


export default function FaveButton() {
  const [isFaved, setIsFaved] = useState(false)


  return (
    <button
      className={`btn fave-btn ${isFaved ? "is-faved" : ""}`}
      type="button"
      onClick={() => setIsFaved(!isFaved)}
    >
      <i className="icon">
        <HeartIcon />
      </i>
    </button>
  )
}
