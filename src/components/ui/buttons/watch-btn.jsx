import { useNavigate } from "react-router-dom"
import { PlayIcon } from "@heroicons/solid"
import {
  updatePlayedMoviesOnProfiles,
  updatePlayedSeriesOnProfiles,
  upsertPlayedMovies,
  upsertPlayedSeries,
} from "@src/lib/supabase/db"


export default function WatchButton({ item }) {
  const { id, title, media } = item
  const navigate = useNavigate()

  async function playMovie() {
    if (media === "movie") {
      updatePlayedMoviesOnProfiles("add", id)
      upsertPlayedMovies(id, title)
    } else if (media === "tv") {
      updatePlayedSeriesOnProfiles("add", id)
      upsertPlayedSeries(id, title)
    }

    navigate("/player", { state: { id, media } })
  }


  return (
    <button
      className="btn watch-btn"
      type="button"
      onClick={playMovie}
    >
      <i className="icon">
        <PlayIcon />
      </i>
      <span>Watch</span>
    </button>
  )
}
