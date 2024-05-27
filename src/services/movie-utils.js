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
  let returnValue = ""
  genres.forEach((genre) => {
    if (genre.name === "Science Fiction") {
      returnValue += "Sci-Fi, "
      return
    }
    returnValue += `${genre.name}, `
  })

  return returnValue.slice(0, -2)
}

// byidx
export function getGenresWithIds(type = "movie", ids = []) {
  let returnValue = ""

  if (type === "movie") {
    ids.forEach(id => {
      returnValue += `${MOVIE_GENRES[id]}, `
    })
  } else if (type === "tv") {
    ids.forEach(id => {
      returnValue += `${TV_GENRES[id]}, `
    })
  }

  return returnValue.slice(0, -2)
}


export function getMovieDirector(crew = []) {
  return crew.filter(({ job }) => job === "Director")[0].name
}
