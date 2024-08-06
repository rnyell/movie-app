import { getMovieGenres, getGenresWithIds } from "@services/movie-utils"

import cls from "@lib/ui/cls"
import classes from "./genres.module.css"


export default function Genres({
  genres = [],
  media,
  shape = "normal",
  isMultiline = false,
  customStyles
}) {
  const genresArray = genres[0]?.name ? getMovieGenres(genres) : getGenresWithIds(media, genres)

  return (
    <div
      className={cls(classes, ["genres", shape], customStyles)}
      data-multiline={isMultiline}
    >
      {genresArray.map(genre => (
        <span key={genre}>{genre}<i>,</i></span>
      ))}
    </div>
  )
}
