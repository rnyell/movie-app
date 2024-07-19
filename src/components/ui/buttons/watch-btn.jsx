import { useNavigate } from "react-router-dom"
import { PlayIcon } from "@heroicons/solid"
import {
  updatePlayedMoviesOnProfiles,
  updatePlayedSeriesOnProfiles,
  upsertPlayedMovies,
  upsertPlayedSeries,
} from "@src/lib/supabase/db"
import { Button, Icon } from "@src/lib/ui/components"


export default function WatchButton({ item, ...props }) {
  const navigate = useNavigate()
  const { id, title, media } = item
  const { 
    text,
    size,
    iconSize,
    customStyles
  } = props

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
    <Button
      variants="solid-accent"
      size={size}
      customStyles={`rounded-lg pointer ${customStyles}`}
      onClick={playMovie}
    >
      <Icon
        svg={<PlayIcon />}
        size={iconSize}
      />
      {text && <span>{text}</span>}
    </Button>
  )
}
