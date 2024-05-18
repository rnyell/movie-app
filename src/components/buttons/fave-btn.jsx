import { useState } from "react"
import { HeartIcon } from "@heroicons/outline"
import { useLocalStorage } from "@utils/hooks"
import { useUserState } from "@src/store/app-context"


export default function FaveButton() {
  const [isFaved, setIsFaved] = useState(false)


  return (
    <button
      className={`main-btn fave-btn ${isFaved ? "is-faved" : ""}`}
      onClick={() => setIsFaved(!isFaved)}
    >
      <i className="icon">
        <HeartIcon />
      </i>
    </button>
  )
}
