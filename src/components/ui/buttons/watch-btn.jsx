import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PlayIcon } from "@heroicons/solid"
import { useLocalStorage } from "@utils/hooks"
import { useUserContext } from "@src/store/user-context"


export default function WatchButton({ data }) {
  const {id, media, prevUrl} = data
  const {userState, userDispatch} = useUserContext()
  const [, setPlayedLS] = useLocalStorage("played", userState.played)
  const navigate = useNavigate()

  useEffect(() => {
    setPlayedLS(userState.played)
  }, [location])
  
  function playMovie() {
    userDispatch({ type: "played", id })
    navigate("/player", { state: { id, media, prevUrl } })
    // setPlayedLS(userState.played) //? has no effect!
  }


  return (
    <button className="btn watch-btn" type="button" onClick={playMovie}>
      <i className="icon">
        <PlayIcon />
      </i>
      <span>Watch</span>
    </button>
  )
}
