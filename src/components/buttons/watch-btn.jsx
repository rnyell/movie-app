import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PlayIcon } from "@heroicons/solid"
import { useLocalStorage } from "@utils/hooks"
import { useUserState } from "@src/store/app-context"


export default function WatchButton({ data }) {
  const {id, media, prevUrl} = data
  const {userState, userDispatch} = useUserState()
  const [, setPlayedLS] = useLocalStorage("played", userState.played)
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
    
    }
  }, [])
  
  function playMovie() {
    userDispatch({ type: "played", id })
    setPlayedLS(userState.played)
    navigate("/player", { state: { id, media, prevUrl } })
  }


  return (
    <button className="btn watch-btn" onClick={playMovie}>
      <i className="icon">
        <PlayIcon />
      </i>
      <span>Watch</span>
    </button>
  )
}
