import { Link } from "react-router-dom"
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
  const Element = shape === "chip" ? Link : "span"
  const result = genres[0]?.name ? getMovieGenres(genres) : getGenresWithIds(media, genres)

  return (
    <div
      className={cls(classes, ["genres", shape], customStyles)}
      data-multiline={isMultiline}
    >
      {result.map((genre) => (
        <Element
          className={classes.genre}
          to={`/discover/genres?m=${media}&id=${genre.id}&page=1`}
          key={genre.name}
        >
          {genre.name}<i>,</i>
        </Element>
      ))}
    </div>
  )
}
