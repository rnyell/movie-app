import { Link } from "react-router-dom"
import { getMovieGenres, getGenresWithIds } from "@services/movie-utils"
import cn from "@lib/ui/cn"
import classes from "./genres.module.css"

export default function Genres({
  genres = [],
  media,
  shape = "normal",
  isMultiline = false,
  className
}) {
  const Element = shape === "chip" ? Link : "span"
  const result = genres[0]?.name ? getMovieGenres(genres) : getGenresWithIds(media, genres)

  return (
    <div
      className={cn(classes.genres, classes[shape], className)}
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
