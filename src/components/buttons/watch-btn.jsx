import { useNavigate } from "react-router-dom"
import { useAppContext } from "@src/store"
import { useAuth } from "@src/auth/auth-context"
import { PlayIcon } from "@heroicons/solid"
import {
  updatePlayedMoviesOnProfile,
  updatePlayedSeriesOnProfile,
  upsertPlayedMovies,
  upsertPlayedSeries,
} from "@lib/supabase/db"
import { Button, Icon } from "@lib/ui/components"

export default function WatchButton({ item, ...props }) {
  const { id, title, media } = item
  const { text, size, iconSize, className, isSquare } = props
  const { modalDispatch } = useAppContext()
  const { session } = useAuth()
  const navigate = useNavigate()

  async function playMovie() {
    if (session) {
      if (media === "movie") {
        updatePlayedMoviesOnProfile("add", id)
        upsertPlayedMovies(id, title)
      } else if (media === "tv") {
        updatePlayedSeriesOnProfile("add", id)
        upsertPlayedSeries(id, title)
      }
      navigate("/player", { state: { id, media } })
    } else {
      modalDispatch({ type: "watch" })
    }
  }

  return (
    <Button
      className={`cursor-pointer ${className ?? ""}`}
      variant="solid-accent"
      size={size}
      isSquare={isSquare}
      onClick={playMovie}
    >
      <Icon svg={<PlayIcon />} size={iconSize} />
      {text && <span>{text}</span>}
    </Button>
  )
}
