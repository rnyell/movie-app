import { MOVIE_GENRES, TV_GENRES } from "./movies-services"


export function formatRuntime(runtime) {
  const hours = Math.trunc(runtime / 60)
  const mins = runtime % 60
  const formatted =
    hours === 0
      ? `${mins} m`
      : mins === 0
      ? `${hours} h`
      : `${hours} h ${mins} m`
  return formatted
}

export function formatRate(rate) {
  let rounded = Math.round(rate * 10) / 10
  if (String(rounded).length === 1) {
    return `${rounded}.0`
  }
  return rounded
}

export function formatReleaseDate(date) {
  return date?.substring(0, 4)
}

export function getMovieGenres(genres) {
  let returnValue = []
  genres.forEach(genre => {
    if (genre.name === "Science Fiction") {
      returnValue.push({ id: genre.id, name: "Sci-Fi" })
      return
    }
    returnValue.push({ id: genre.id, name: genre.name })
  })

  return returnValue
}

export function getGenresWithIds(media = "movie", ids = []) {
  let returnValue = []

  if (media === "movie") {
    ids.forEach(id => {
      returnValue.push({ id, name: MOVIE_GENRES[id] })
    })
  } else if (media === "tv") {
    ids.forEach(id => {
      returnValue.push({ id, name: TV_GENRES[id] })
    })
  }

  return returnValue
}

export function getMovieDirector(crew = []) {
  return crew.filter(({ job }) => job === "Director")[0].name
}
